'use strict'
/**
 * @description Monolithic goods management controller
 * @author Junhee Park (j.jobs1028/gmail.com, Qualcomm Institute)
 * @since       2018. 07. 12.
 * @last update 2018. 07. 12.
 */

/**
 * @method Call the micro service goods
 * @param method    method
 * @param pathname  URL
 * @param params    input parameters
 * @param cb        callback
 */
exports.onRequest = function (res, method, pathname, params, cb) {
    switch (method) {
        case "POST":    //Insert
            return "POST"
        case "GET":     //Search
            return inquery(method, pathname, params, (response) => {
                process.nextTick(cb, res, response);
            });
        default:        //Delete
            return "DELETE"
    }
}
/**
 * @method goods inquery
 * @param method    method
 * @param pathname  URL
 * @param params    input parameters
 * @param cb        callback
 */
function inquery(method, pathname, params, cb) {
    var response = {
        key: params.key,
        errorcode: 0,
        errormessage: "success"
    };
    response.results = "success";
    cb(response);
}