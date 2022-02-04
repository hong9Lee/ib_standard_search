const { Client } = require('@elastic/elasticsearch');
const config = require('../../../config/config');

module.exports = {
    esClient: new Client({
        node: config.ELASTICSEARCH_HOST,
        requestTimeout: config.REQUEST_TIMEOUT
    })
};
