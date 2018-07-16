'use strict'
/**
 * @description Logger Object
 * @author Junhee Park (j.jobs1028/gmail.com, Qualcomm Institute)
 * @since       2018. 07. 13.
 * @last update 2018. 07. 13.
 * const log4js = require('log4js');
 * log4js.configure({
 *    appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
 *    categories: { default: { appenders: ['cheese'], level: 'error' } }
 * });
 * const logger = log4js.getLogger('cheese');
 * logger.trace('Entering cheese testing');
 * logger.debug('Got cheese.');
 * logger.info('Cheese is Gouda.');
 * logger.warn('Cheese is quite smelly.');
 * logger.error('Cheese is too ripe!');
 * logger.fatal('Cheese was breeding ground for listeria.');
 * 
 * 
 * 
 */

const log4js = require('log4js');
log4js.configure({
    appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
    categories: { default: { appenders: ['cheese'], level: 'debug' } }
});
class slLogger {
    constructor(logLevel) {
        this.logger = log4js.getLogger();
        if (logLevel === undefined) logLevel = 'debug'
        this.logger.level = logLevel;
    }
    trace(message) {
        this.logger.trace(message);
    }
    debug(message) {
        this.logger.debug(message);
    }
    info(message) {
        this.logger.info(message);
    }
}
module.exports = slLogger;