const { QUERY_STRING_FIELDS, INCLUDE_FIELDS } = require('./index');

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
    boolBody.size = obj.size;
    boolBody.from = obj.from;
    boolBody._source = { includes: INCLUDE_FIELDS[INDEX] };
    boolBody.query.bool.must = queryArr;
    return boolBody;
}

const QUERY_BODY = {
    /** 공지사항, 자료실, FAQ, QNA */
    ARTI : (obj, INDEX) => {
        return setAttValue(obj, INDEX, [setQueryString(INDEX, obj.keyword),
            setSingleMatch('bod_id', obj.bod_id)])
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
