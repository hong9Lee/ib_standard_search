const { logger } = require('../module/logger');
const utils = require('../util/util');
const { INDEX_ALIAS } = require('../constants');
const { sendOpenQueryLog } = require('../module/openquery');
const { getApiResult } = require('../model/payload');
const { setReqObj, convertArtiRes } = require('../util/converter');
const { QUERY_BODY } = require('../constants/query');

const INDEX = INDEX_ALIAS.ARTI;
logger.info(`index => ${INDEX}`);

/** 공지사항, 자료실, FAQ, QNA => ARTI */
module.exports = {
    // search: async (req, res) => {
    //     const startTime = new Date();
    //     let apiResult = getApiResult();
    //
    //     try {
    //         let reqObj = setReqObj(req);
    //         utils.assignObj(apiResult, req);
    //
    //         /** get body */
    //         let body = QUERY_BODY.ARTI(reqObj, INDEX);
    //
    //         /** get result */
    //         let result = await utils.search(INDEX, body);
    //
    //         res.status(200).json(setResponse(apiResult, result, startTime, INDEX));
    //         // await sendOpenQueryLog(INDEX, utils.escapeReservedCharacter(reqObj.keyword), apiResult, result);
    //     } catch (err) {
    //         return utils.setCatchError(INDEX, err, apiResult, res);
    //     }
    // },

    search: async (req, res) => {
        const startTime = new Date();
        let apiResult = getApiResult();
        try {
            let reqObj = setReqObj(req);
            utils.assignObj(apiResult, req);

            /** get body */
            let body = QUERY_BODY.ARTI(reqObj, INDEX);
            /** get result */
            let result = await utils.search(INDEX, body);

            res.status(200).json(convertArtiRes(apiResult, result, reqObj, INDEX, startTime));
            // await sendOpenQueryLog(INDEX, utils.escapeReservedCharacter(reqObj.keyword), apiResult, result);
        } catch (err) {
            return utils.setCatchError(INDEX, err, apiResult, res);
        }
    }
};
