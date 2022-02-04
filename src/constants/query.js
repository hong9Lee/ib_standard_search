const { QUERY_STRING_FIELDS } = require('./index');
const { logger } = require('../module/logger');

const setQueryString = (keyword, ...indexNms) => ({
    query_string: {
        query: keyword,
        fields: indexNms.flatMap(indexNm => QUERY_STRING_FIELDS[indexNm])
    }
});

const setMatchAll = () => ({
    match_all: {}
});

const QUERY_BODY = {
    MALL: (keyword, searchOption) => {
        const body = {
            bool: {
                must: [],
                must_not: [
                    {
                        exists: {
                            field: 'IMPR_CORP_NO'
                        }
                    }
                ],
                should: [],
                filter: [
                    {
                        exists: {
                            field: 'GDS_DIV_CD'
                        }
                    },
                    // {
                    //     term: {
                    //         'RPRSNT_GDS_YN.keyword': 'Y'
                    //     }
                    // },
                    {
                        term: {
                            'PRDCT_PUNSH_YN.keyword': 'N'
                        }
                    },
                    {
                        term: {
                            'INV_CORP_PUNSH_YN.keyword': 'N'
                        }
                    }
                ]
            }
        }

        if (keyword) {
            if (!searchOption) {
                body.bool.must.push(setQueryString(keyword, 'MALL'));
            } else if (searchOption === '01') { // 세부품명
                body.bool.must.push({
                    query_string: {
                        query: keyword,
                        fields: ['PRDCT_CLSFC_NM.keyword']
                    }
                });
            } else if (searchOption === '02') { // 업체명
                body.bool.must.push({
                    query_string: {
                        query: keyword,
                        //fields: ['CORP_NM^70', 'CORP_NM.text_keyword^80', 'CORP_NM.kobrick^30', 'CORP_NM.standard^70']
                        fields: ['CORP_NM.keyword']
                    }
                });
            } else if (searchOption === '03') { // 물품식별번호
                body.bool.must.push({
                    query_string: {
                        query: keyword,
                        fields: ['GDS_IDNT_NO.keyword']
                    }
                });
            } else if (searchOption === '04') { // 규격
                body.bool.must.push({
                    query_string: {
                        query: keyword,
                        fields: ['PRDCT_SPEC_NM.text_keyword^80', 'PRDCT_SPEC_NM.kobrick^50', 'PRDCT_SPEC_NM.standard^70']
                    }
                });
            } else {
                logger.error(`mall searchOption "${searchOption}" is invalid searchOption.`);
                body.bool.must.push(setQueryString(keyword, 'MALL'));
            }
        } else {
            body.bool.must.push(setMatchAll());
        }
        return body;
    }
}

module.exports = {
    QUERY_BODY,
    HIGHLIGHT_BODY: () => ({
        pre_tags: '<HS>',
        post_tags: '</HS>',
        fields: {
            '*': {}
        }
    })
}
