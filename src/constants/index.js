module.exports = {
    INDEX_ALIAS: {
        ARTI: 'jcop-arti',
        INFRA: 'jcop-infra',
        TPCO: 'jcop-tpco',
        JCC: 'jcop-jcc',
        MAT: ["jcop-biosp", "jcop-cmi", "jcop-tbh"]
    },

    INCLUDE_FIELDS: {
        "jcop-arti": ["arti_id", "bod_id", "title", "cont", "reg_dtm", "bod_nm"],
        "jcop-infra": ["dev_cd", "dev_nm_ko", "dev_nm_en", "dev_desc", "img_id", "img_nm", "img_save_nm", "img_save_path"],
        "jcop-tpco": ["order_cd", "rcp_nm", "shape", "benefit", "image_file_id"],
        "jcop-jcc": ["cosName", "cosNameCn", "cosNameEn", "cos_typeNm", "cpName", "cosCert", "cosImg"]
    },

    /**
     * query_string query fields
     */
    QUERY_STRING_FIELDS: {
        "jcop-arti": ["title.kobrick^10", "cont.kobrick^10"],
        "jcop-infra": ["dev_nm_ko.kobrick^10", "dev_nm_en.kobrick^10", "dev_desc.kobrick^10"],
        "jcop-tpco": ["rcp_nm.kobrick^10", "shape.kobrick^10"],
        "jcop-jcc": ["cosName.kobrick^10", "cosNameCn.kobrick^10", "cosNameEn.kobrick^10", "cos_typeNm.kobrick^10", "cpName.kobrick^10"]
    },

    /**
     * 하이라이팅 필드
     */
    HL_FIELDS: {
        "jcop-arti": ["title", "cont"],
        "jcop-infra": ["dev_nm_ko", "dev_nm_en", "dev_desc"],
        "jcop-tpco": ["rcp_nm", "shape"],
        "jcop-jcc": ["cosName", "cosNameCn", "cosNameEn", "cos_typeNm", "cpName"],
        "jcop-biosp": ["jong_kor", "hak_nm", "biosp_group"],
        "jcop-cmi": ["category", "func", "scntnm"],
        "jcop-tbh": ["mtr_nm"]
    },

    TRACK_TOTAL_HITS: true,
}
