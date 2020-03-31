const winston = require('winston');
const config = require('../config/config.global');
const Loggly = require('winston-loggly-bulk').Loggly;

const dateFormat = () => {
    return new Date(Date.now()).toString();
}

export default class LoggerService {
    constructor(route) {
        this.logData = null;
        this.route = null;

        const logger = winston.createLogger({
            transports: [
                // new winston.transports.Console,
                new Loggly(config.loggly)
                // new winston.transports.File({
                //     filename: `./logs/${route}.log`,
                //     maxsize: 5242880,
                //     maxFiles: 25
                // })
            ],
            format: winston.format.printf((info) => {
                let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${route}.log ${info.message} | `;
                message = info.obj ? message + `data: ${JSON.stringify(info.obj)} | ` : message;
                message = this.logData ? message + `logData: ${JSON.stringify(this.logdata)} | ` : message;
                return message; 
            })
        });
        logger.stream = {
            write: (info) => {
                logger.info
            }
        }
        this.logger = logger;
    }

    async setLogData (logData) {
        this.logData = logData;
    }

    async info (message) {
        this.logger.log('info', message);
    }

    async info(message, obj) {
        this.logger.log('info', message, { obj });
    }

    async debug(message) {
        this.logger.log('debug', message);
    }

    async debug(message, obj) {
        this.logger.log('debug', message, { obj });
    }

    async error(message) {
        this.logger.log('error', message);
    }
    async error(message, obj) {
        this.logger.log('error', message, { obj })
    }
}
