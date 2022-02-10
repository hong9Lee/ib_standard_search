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
    ARTI : (obj, INDEX) => {
        let query = setAttValue(obj, INDEX, [setQueryString(INDEX, obj.keyword)])
        query.aggs = {"num": {"terms": {"field": "bod_nm.keyword"}}}
        return query;
    },

    /** 화장품 원물 (jcop-biosp), 화장품 원료 (jcop-cmi), 제1 공장 원료 (jcop-tbh) => matInfo */
    MATINFO : (obj, INDEX) => {
        let a = [
            {"index":"jcop-biosp"},
            {"query":{"bool":{"must":[{"query_string":{"query":"파래","fields":["jong_kor.kobrick^10", "hak_nm.kobrick^10", "biosp_group.kobrick^10"]}}]}},"highlight":{"pre_tags":"<HS>","post_tags":"</HS>","fields":{"*":{}}}},
            {"index":"jcop-cmi"},
            {"query":{"bool":{"must":[{"query_string":{"query":"식물","fields":["category.kobrick^10", "func.kobrick^10", "scntnm.kobrick^10"]}}]}},"highlight":{"pre_tags":"<HS>","post_tags":"</HS>","fields":{"*":{}}}},
            {"index":"jcop-tbh"},
            {"query":{"bool":{"must":[{"query_string":{"query":"알루미늄","fields":["mtr_nm.kobrick^10"]}}]}},"highlight":{"pre_tags":"<HS>","post_tags":"</HS>","fields":{"*":{}}}}
        ]
        return a;
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
