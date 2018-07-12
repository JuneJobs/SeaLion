'use strict'
/**
 * @description Tcp Server Object distributor
 * @author Junhee Park (j.jobs1028/gmail.com, Qualcomm Institute)
 * @since       2018. 07. 12.
 * @last update 2018. 07. 12.
 */

/**
 * Extends tcpServer class to distributor class
 * 
 * Extends tcpServer class to distrbutor class. distributor exist for share each clients address.
 * When create a socket, the address and port information stored in the map object. 
 * 
 */

/**
 * Define protocol
 * 
 * [
 *    {
 *        "port": "port of the first node",
 *        "name": "name of the first node",
 *        "urls": [
 *            "first url of the first node",
 *            "second url of the first node"
 *            ...
 *        ],
 *        "host": "host of the first node"
 *    },
 *  {
 *        "port": "port of the second node",
 *        "name": "name of the second node",
 *        "urls": [
 *            "first url of the second node",
 *            "second url of the sencond node"
 *            ...
 *        ],
 *        "host": "host of the sencond node"
 *    },
 *    ...
 * ]
 */
class slDistributor extends require('../lib/slTcpServer') {
    constructor() {
        super("slDistributor", 9000, ["POST/distributes", "GET/distributes"]); //super call the constructor of parents
        this.map = {};
    }

    onCreate(socket) {
        console.log("onCreate", socket.remoteAddress, socket.remotePort);
        this.sendInfo(socket);
    }

    onClose(socket) {
        var key = socket.remoteAddress + ":" + socket.remotePort;
        console.log("onClose", socket.remoteAddress, socket.remotePort);
        delete this.map[key];
        this.sendInfo();//send all nodes
    }

    onRead(socket, json) {
        var key = socket.remoteAddress + ":" + socket.remotePort;
        console.log("OnRead", socket.remoteAddress, socket.remotePort, json);

        if (json.uri == "/distributes" && json.method == "POST") {
            this.map[key] = {
                socket: socket
            };
            this.map[key].info = json.params;
            this.map[key].info.host = socket.remoteAddress;
            this.sendInfo();//send all nodes
        }
    }

    write(socket, packet) {
        socket.write(JSON.stringify(packet) + '	');
    }

    sendInfo(socket) {
        var packet = {
            uri: "/distributes",
            method: "GET",
            key: 0,
            params: []
        };
        for (var n in this.map) {
            packet.params.push(this.map[n].info);
        }

        if (socket) {
            this.write(socket, packet);
        } else {
            for (var n in this.map) {
                this.write(this.map[n].socket, packet);
            }
        }
    }
}

module.exports = slDistributor;
