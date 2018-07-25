'use strict'
/**
 * @description Microservice goods management controller
 * @author Junhee Park (j.jobs1028/gmail.com, Qualcomm Institute)
 * @brief Create microservice using tcpServer class. 
 * @since       2018. 07. 19.
 * @last update 2018. 07. 19.
 */

//Reference from business logic
const config = require('../config/default.json');
const urm010 = require("./urm010.js");
const ms_config = require("../config/userManagement.json")
const slLogger = require("../lib/slLogger");
var logger = new slLogger(config.loggerLevel);

//Reference from server logic
class userManagement extends require('../lib/slTcpServer') {
    constructor() {
        super("userManagement"  //extended the tcpServer class
            , process.argv[2] ? Number(process.argv[2]) : 9010
            , ms_config.forms
        );

        this.connectToDistributor("127.0.0.1", 9000, (data) => {    //Connect to distributor
            console.log("Distributor Notification", data);
        })

    }
    onRead(socket, data) { //Call the business logic for the client request 
        console.log("onRead", socket.remoteAddress, socket.remotePort, data);
        urm010.onRequest(socket, data.method, data.uri, data.params, (s, packet) => {
            socket.write(JSON.stringify(packet) + '	');
        })
    }
}

new userManagement();