'use strict'
/**
 * @description user management form urm010 (sign up)
 * @author Junhee Park (j.jobs1028/gmail.com, Qualcomm Institute)
 * @since       2018. 07. 24.
 * @last update 2018. 07. 24.
 */

/**
 * @method Call the micro service urm010
 * @param method    method
 * @param pathname  URL
 * @param params    input parameters
 * @param cb        callback
 */
exports.onRequest = function (res, method, pathname, params, cb) {
    if(method === "POST") {
        return inquery(method, pathname, params, (response) => {
            process.nextTick(cb, res, response); //sync callback
        });
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

/**
 * User Management msg
 * 
 * SAP: SGU-REQ, SAP: SGU-RSP
 * SWP: SGU-REQ. SWP: SGU-RSP
 * SDP: SGU-REQ, SDP: SGU-RSP
 * 
 * SAP: UVC-REQ, SAP: UVC-RSP
 * SWP: UVC-REQ, SWP: UVC-RSP
 * SDP: UVC-REQ, SDP: UVC-RSP
 * 
 */