const axios = require('axios');
const config = require('../../../config/config');
const {logger} = require('../logger');

module.exports = {
    //mainApiResult.totalCount.total
    //result.body.took
    sendOpenQueryLog : async (index, keyword, apiResult, result) => {
        let openQueryLog = {
            index : index,
            query : keyword,
            total : apiResult.totalCount.total,
            took  : result.body.took
        }

        try {
            const url = `${config.OPENQUERY_HOST}/gateway/_querylog`;
            await axios.post(url, openQueryLog);
        } catch (err) {
            logger.error(`failed to send querylog to openquery | ${err.stack}`);
        }
    }
};
