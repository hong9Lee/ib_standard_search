const { createLogger, format, transports } = require('winston');
const { combine, timestamp } = format;
require('winston-daily-rotate-file');
const approot = require('app-root-path');
const fs = require('fs');
// const config = require('../../config/config');

const LOG_DIR = `${approot}/logs`;
// const LOG_DIR = `${config.}`;

if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR);
}

const consoleTransport = new transports.Console({
    level: 'info',
    format: combine(
        format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}] - ${info.message}`)
    ),
    colorize: true,
    showLevel: true,
    json: true,
    timestamp: true
});

const dailyRotateFileTransport = new transports.DailyRotateFile({
    level: 'info',
    filename: `${LOG_DIR}/STANDARD_SEARCH-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    format: combine(
        format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}] - ${info.message}`)
    ),
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: 30
});

module.exports = {
    logger: createLogger({
        format: combine(
            timestamp({
                format: 'YYYY-MM-DD HH:mm:ss.SSS'
            })
        ),
        transports: [
            consoleTransport,
            dailyRotateFileTransport
        ]
    })
};
