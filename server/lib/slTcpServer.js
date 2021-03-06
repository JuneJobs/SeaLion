'use strict'
/**
 * @description Tcp Server Object
 * @author Junhee Park (j.jobs1028/gmail.com, Qualcomm Institute)
 * @brief net documentation: https://nodejs.org/api/net.html
 *        +----------------------+
 *        |     slTcpServer      |
 *        +----------------------+
 *        |tcpClient: tcpClient  |
 *        |server: net           |
 *        +----------------------+
 *        |connectToDistributor()|
 *        +----------------------+
 * @since       2018. 07. 11.
 * @last update 2018. 07. 11.
 */

const net = require('net');
const slTcpClient = require('./slTcpClient');
//Define class tcpServer
class slTcpServer {
    //Define constructor
    constructor(name, port, urls) {
        this.context = {    //Server information
            port: port,
            name: name,
            urls: urls
        }
        this.merge = {};

        this.server = net.createServer((socket) => {    //Create server obeject
            this.onCreate(socket);      // (?) net.onCreate, The event occurs when client make connection

            socket.on('error', (exception) => { //Error event
                this.onClose(socket);
            });
            socket.on('close', (exception) => {
                this.onClose(socket);
            });
            socket.on('data', (data) => {
                var key = socket.remoteAddress + ':' + socket.remotePort;
                console.log(key);
                var sz = this.merge[key] ? this.merge[key] + data.toString() :
                    data.toString();
                var arr = sz.split('	');
                for (var n in arr) { // (?)
                    if (sz.charAt(sz.length - 1) != '	' && n == arr.length - 1) {
                        this.merge[key] = arr[n];
                        break;
                    } else if (arr[n] == "") {
                        break;
                    } else {
                        this.onRead(socket, JSON.parse(arr[n]));
                    }
                }
            });
        });

        this.server.on('error', (err) => {      //Handling server object error
            console.log(err);
        });

        this.server.listen(port, () => {
            console.log('listen', this.server.address());
        });
    }

    onCreate(socket) {
        console.log("onCreate", socket.remoteAddress, socket.remotePort);
    }

    onClose(socket) {
        console.log("onClose", socket.remoteAddress, socket.remotePort);
    }

    connectToDistributor(host, port, onNoti) {  //Micro services use this function
        var packet = {
            uri: "/distributes",
            method: "POST",
            key: 0,
            params: this.context
        };
        var isConnectedDistributor = false;

        this.clientDistributor = new slTcpClient(
            host
            , port
            , (options) => {
                isConnectedDistributor = true;
                this.clientDistributor.write(packet);
            }
            , (options, data) => { onNoti(data); }
            , (options) => { isConnectedDistributor = false; }
            , (options) => { isConnectedDistributor = false; }
        );

        setInterval(() => { // Retry connection with distributor
            if (isConnectedDistributor != true) {
                this.clientDistributor.connect();
            }
        }, 3000);
    }
}

module.exports = slTcpServer;