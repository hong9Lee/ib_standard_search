const { logger } = require('../src/module/logger');
const configFile = require('./config.json');
const runMode = configFile.runMode;
const config = configFile[runMode];

logger.info('*************** config *****************');
logger.info(`* runMode [local/dev/prod] : ${runMode}`);
logger.info(`* app_port : ${config.APP_PORT}`);
logger.info(`* openquery_host : ${config.OPENQUERY_HOST}`);
logger.info(`* elasticsearch : ${config.ELASTICSEARCH_HOST}`);
logger.info('****************************************');

module.exports = config;
