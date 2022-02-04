const { logger } = require("../module/logger");
const { INDEX_ALIAS, TRACK_TOTAL_HITS } = require('../constants');
const { getApiResult, setApiResult } = require('../model/payload');
const { QUERY_BODY } = require('../constants/query');

const escapeReservedCharacter = str => str.replace(/([!*+&|()<>[\]{}^~?:\-="/\\])/g, '\\$1');

module.exports = {
    /**
     * 실행시간 계산
     * @param start (시작시간)
     */
    chkTime: start => `${new Date() - start} ms`,

    setSortArray: (sorts, titleFieldNm) => sorts.map(sort => {
        let [sortValue, sortType] = sort.split('^');
        if (sortValue === 'title') {
            sortValue = titleFieldNm;
        }
        if (sortValue === 'register_date') {
            sortValue = 'bibliographic.register_date'
        }
        return {
            [sortValue]: {
                order: sortType
            }
        };
    }),

    setValidationError: (req, validationErrors) => {
        const apiResult = getApiResult();
        return {
            ...apiResult,
            status: 412,
            message: 'request validation error. Please check request parameter.',
            validationErrors,
            request: req.body
        }
    },

    /**
     * json show pretty
     * @param body (json)
     */
    jsonStringify: body => JSON.stringify(body, null, 2),

    /**
     * 검색 결과 하이라이팅 필드 파싱 후 response 배열 리턴
     * @param body.hits.hits (api response)
     * @param highlightField (파싱하려는 필드 명이 담겨있는 배열)
     * @returns hit._source (type: array)
     */
    setResponse: (hits, highlightFields) => hits.map(hit => {
        if (!highlightFields || !hit.highlight) {
            return hit._source;
        }
        Object.entries(hit.highlight).forEach(([key, value]) => {
            key = key.substring(0, key.lastIndexOf('.'));
            if (highlightFields.includes(key)) {
                hit._source[key + '_hs'] = value.toString();
            }
        });
        return hit._source;
    }),

    // makeResearchKeyword: (keyword, researchKeywords) => {
    //     if (keyword && researchKeywords.length > 0) { // 결과 내 재검색 keyword가 존재 할 경우 keyword에 추가
    //         keyword += ` AND ${researchKeywords.reduce((acc, curr) => `${acc} AND ${curr}`)}`;
    //         logger.debug(`keyword: ${keyword}`);
    //     }
    //     return escapeReservedCharacter(keyword);
    // },

    msearchIndex: indexNm => ({
        index: INDEX_ALIAS[indexNm]
    }),

    msearchBody: (indexNm, keyword, size, highlight) => ({
        track_total_hits: TRACK_TOTAL_HITS,
        size,
        highlight,
        query: QUERY_BODY[indexNm](keyword)
    })
}
