'use strict'
/**
 * @description Logger Object
 * @author Junhee Park (j.jobs1028/gmail.com, Qualcomm Institute)
 * @since       2018. 07. 12.
 * @last update 2018. 07. 12.
 * +-------------+
 * |   slLogger  |
 * +-------------+
 * |client: net  |
 * +-------------+
 * |connect()    |
 * |write()      |
 * +-------------+
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
    debug(messaage){
        this.logger.debug(messaage);
    }
}
module.exports = slLogger;