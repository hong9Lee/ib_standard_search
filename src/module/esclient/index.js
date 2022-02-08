const { Client } = require('@elastic/elasticsearch');
const config = require('../../../config/config.json');
const runMode = config.runMode;

module.exports = {
    esClient: new Client({
        node: config[runMode].ELASTICSEARCH_HOST,
        requestTimeout: config[runMode].REQUEST_TIMEOUT
    })
};
