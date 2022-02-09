module.exports = {
    getApiResult: () => ({
        status: 200,
        message: 'success',
        validationErrors: [],
        time: '',
        totalCount: {
            total: 0
        },
        request: {
            keyword: '',
            sorts: ['_score^desc'],
            size: 10,
            from: 0
        },
        response: {}
    }),

    getCountResult: () => ({
       status: 500,
        message: 'success',
        validationErrors: [],
        time: '',
        request : {
           keyword: ''
        },
        response: {}
    }),

    getDetailApiResult: () => ({
        status: 200,
        message: 'success',
        validationErrors: [],
        time: '',
        totalCount: {
            // total: 0

        },
        request: {},
        response: {}
    }),

    setApiResult: result => ({
        status: 0,
        message: '',
        validationErrors: [],
        time: '',
        totalCount: {},
        request: {},
        response: [],
        ...result
    }),

    getMainApiResult: () => ({
        status: 200,
        message: 'success',
        validationErrors: [],
        time: '',
        totalCount: {
            total: 0,
            mall: 0,
            excellentGoods: 0,
            goods: 0,
            venture: 0,
            promotion: 0,
            prpslInfoRfp: 0,
            ndsl: 0,
            // pattInfo: 0,
            invDmndInfo: 0,
            itemTotal: 0

        },
        request: {
            keyword: ''
        },
        response: {
            // mall: [],
            // prpsInfo: [],
            // ndsl: [],
            // // TODO 특허정보 필드 추가
            // pattInfo: [],
            // invDmndInfo: [],
            // promotion: []
        }
    })
}
