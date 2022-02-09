const { QUERY_STRING_FIELDS, INCLUDE_FIELDS, BOD_IDS } = require('./index');

const HIGHLIGHT_BODY = () => ({
    pre_tags  : '<HS>',
    post_tags : '</HS>',
    fields    : {'*' : {}}
});

const setMatchAll = () => ({
    match_all : {}
});

const setSingleMatch = (fieldNm, value) => ({
    match : {
        [fieldNm]: value
    }
});

const boolMustTemplate = () => ({
    query : {
        bool : {
            must : {}
        }
    },
    highlight : HIGHLIGHT_BODY()
});

const setQueryString = (indexNm, keyword) => ({
        query_string : {
            query  : keyword,
            fields : QUERY_STRING_FIELDS[indexNm]
        }
});

const setAttValue = (obj, INDEX, queryArr) => {
    let boolBody = boolMustTemplate();
    // boolBody.size = obj.size;
    boolBody.size = 10000
    boolBody.from = obj.from;
    boolBody._source = { includes: INCLUDE_FIELDS[INDEX] };
    boolBody.query.bool.must = queryArr;
    return boolBody;
}

const artiCount_BODY = (obj, INDEX) => {
    // let body = [];
    // body.push({"index":INDEX},
    //     {"query":{"bool":{"must":[{"query_string":{"fields":["bod_id"],"query":"5 OR 9 OR 13 OR 17 OR 21 OR 25"}},
    //                     {"query_string":{"fields":["title.kobrick^10","cont.kobrick^10"],"query":"화장품"}}]}},"size":0},)
    //
    // for()


}

const QUERY_BODY = {
    /** 공지사항, 자료실, FAQ, QNA */
    // ARTI : (obj, INDEX) => {
    //     return setAttValue(obj, INDEX, [setQueryString(INDEX, obj.keyword),
    //         setSingleMatch('bod_id', obj.bod_id)])
    // },

    ARTI : (obj, INDEX) => {
        let query = setAttValue(obj, INDEX, [setQueryString(INDEX, obj.keyword)])
        query.aggs = {"num": {"terms": {"field": "bod_nm.keyword"}}}
        return query;
    },

    /** 공공생산 인프라 관리 */
    INFRA : (obj, INDEX) => {
        return setAttValue(obj, INDEX,[setQueryString(INDEX, obj.keyword)]);
    },

    /** 조제 관리사 매칭 */
    TPCO : (obj, INDEX) => {
        return setAttValue(obj, INDEX,[setQueryString(INDEX, obj.keyword)]);
    },

    /** 제주 화장품 인증 관리 */
    JCC : (obj, INDEX) => {
        return setAttValue(obj, INDEX,[setQueryString(INDEX, obj.keyword)]);
    }
}




module.exports = {
    QUERY_BODY
}
