const { logger } = require('../../module/logger');
const { esClient } = require('../../module/esclient');
const Util = require('../../util/util');
const { INDEX_ALIAS } = require('../../constants');
const { sendOpenQueryLog } = require('../../module/openquery');
const { getMainApiResult } = require('../../model/payload');
const { HIGHLIGHT_BODY } = require('../../constants/query');

const INDEX = INDEX_ALIAS.MALL;

module.exports = {
    search: async (req, res) => {
        const mainApiResult = getMainApiResult();
        try {
            const startTime = new Date();
            Object.assign(mainApiResult.request, req.body);

            let { keyword } = mainApiResult.request;
            const body = M_SEARCH_INDEX_ARR.flatMap(({ INDEX_NM, SIZE }) =>
                [Util.msearchIndex(INDEX_NM), Util.msearchBody(INDEX_NM, keyword, SIZE, HIGHLIGHT_BODY())]);

            logger.info(keyword);
            /*=== send query to elasticsearch ===*/
            const result = await esClient.msearch({ body });

            mainApiResult.totalCount.total = Object.values(mainApiResult.totalCount).reduce((acc, curr) => acc + curr);
            // 상품 총 건수e
            mainApiResult.totalCount.itemTotal = Object.entries(mainApiResult.totalCount)
                                                    .filter(([key]) => ['mall', 'excellentGoods', 'goods', 'venture', 'promotion'].includes(key))
                                                    .map(([key, value]) => value)
                                                    .reduce((acc, curr) => acc + curr);

            mainApiResult.time = Util.chkTime(startTime);
            res.status(200).json(mainApiResult);
            await sendOpenQueryLog('main_search', keyword, mainApiResult, result);

        } catch (err) {
            logger.error(`mainService err | ${err.stack}`);
            mainApiResult.status = 500;
            mainApiResult.message = err.message;
            return res.status(mainApiResult.status).json(mainApiResult);
        }
    }
};
