module.exports = {
    INDEX_ALIAS: {
        MALL: 'mall'
    },

    /**
     * query_string query fields
     */
    QUERY_STRING_FIELDS: {
        // 상품 정보
        MALL: ['GDS_NM^70', 'GDS_NM.text_keyword^100', 'GDS_NM.kobrick^50', 'GDS_NM.standard^70', 'GDS_NM.ngram^10',
            'PRDCT_SPEC_NM.text_keyword^80', 'PRDCT_SPEC_NM.kobrick^50', 'PRDCT_SPEC_NM.standard^70',
            'CORP_NM^70', 'CORP_NM.text_keyword^80', 'CORP_NM.kobrick^30', 'CORP_NM.standard^70',
            'GDS_IDNT_NO.keyword^80', 'GDS_DSCRPT.kobrick^20', 'GDS_DSCRPT.text_keyword^30', 'GDS_DSCRPT.standard^30',
            'PRDCT_CLSFC_NM.keyword^100'
        ]
    },

    TRACK_TOTAL_HITS: true,
}
