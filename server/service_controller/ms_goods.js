'use strict'
/**
 * @description Microservice goods management controller
 * @author Junhee Park (j.jobs1028/gmail.com, Qualcomm Institute)
 * @brief Create microservice using tcpServer class. 
 * @since       2018. 07. 12.
 * @last update 2018. 07. 12.
 */

//Reference from business logic
const config = require('../config/default.json');
const business = require("./goods.js");
const slLogger = require("../lib/slLogger");
var logger = new slLogger(config.loggerLevel);

//Reference from server logic
class goods extends require('../lib/slTcpServer') {
    constructor() {
        super("goods"  //extended the tcpServer class
            , process.argv[2] ? Number(process.argv[2]) : 9010
            , ["POST/goods", "GET/goods", "DELETE/goods"]
        );

        this.connectToDistributor("127.0.0.1", 9000, (data) => {    //Connect to distrabutor
            console.log("Distributor Notification", data);
        })
        //logger.debug(thisline);
        logger.trace("trace");
        logger.info("info");

    }
    onRead(socket, data) { //Call the business logic for the client request 
        console.log("onRead", socket.remoteAddress, socket.remotePort, data);
        business.onRequest(socket, data.method, data.uri, data.params, (s, packet) => {
            socket.write(JSON.stringify(packet) + '	');
        })
    }
}

new goods();