const fs = require('fs');
const { esClient } = require('./esClient');
const { logger } = require('./logger');

const path = '/ppis_datan/ibricks/TeAnaTextAnalytics/tmp_jbt';

async function * scrollSearch (params) {
    let response = await esClient.search(params);
    let scrollCnt = 0;
    while (true) {
        const sourceHits = response.body.hits.hits;
        if (sourceHits.length === 0) {
            break;
        }

        for (const hit of sourceHits) {
            yield hit;
        }
        
        if (!response.body._scroll_id) {
            logger.info(`total scroll count: ${scrollCnt * params.size + response.body.hits.total.value}`);
            logger.info('scroll process end');
            break;
        }
        logger.info(`total scroll count: ${++scrollCnt * params.size}`);

        response = await esClient.scroll({
            scrollId: response.body._scroll_id,
            scroll: params.scroll
        })
    }
}

async function run () {
    fs.closeSync(fs.openSync(`${path}/patentJbt1.json`, 'w'));

    const params = {
        index: 'patent',
        scroll: '1m',
        size: 10000,
        _source: ['bibliographic.application_number', 'doc.invention_contents'],
        body: {
            query: {
                match_all: {}
            }
        }
    }

    let filenameCnt = 1;
    for await (const hit of scrollSearch(params)) {
        const line = {
            application_number: hit._source.bibliographic.application_number,
            invention_contents: hit._source.doc.invention_contents
        }
        
        const stats = await fs.promises.stat(`${path}/patentJbt${filenameCnt}.json`);
        const fileSize = stats.size / (1024 * 1024 * 1024); // GB
        if (fileSize > 1) {
            filenameCnt++;
        }
        // await fs.promises.write(`${path}/patentJbt${filenameCnt}.json`, )
        // fs.promises.open(`${path}/patentJbt${filenameCnt}.json`, )
        await fs.promises.appendFile(`${path}/patentJbt${filenameCnt}.json`, JSON.stringify(line) + "\r\n");
    }
}

run().catch(err => {
    logger.error(err.stack);
})