'use strict'
/**
 * @description Tcp Client Object
 * @author Junhee Park (j.jobs1028/gmail.com, Qualcomm Institute)
 * @brief net documentation: https://nodejs.org/api/net.html
 * @since       2018. 07. 11.
 * @last update 2018. 07. 11.
 * +-------------+
 * | slTcpClient |
 * +-------------+
 * |client: net  |
 * +-------------+
 * |connect()    |
 * |write()      |
 * +-------------+
 */

const net = require('net');

//Define class slTcpClient 
class slTcpClient {
    //Define constructor
    constructor(host, port, onCreate, onRead, onEnd, onError) {
        this.options = {
            host: host,
            port: port
        };
        this.onCreate = onCreate;
        this.onRead = onRead;
        this.onEnd = onEnd;
        this.onError = onError;
    }
    //Connection
    connect() {
        //It's client part to make a connection with server using TCP socket
        this.client = net.connect(this.options, () => {
            if (this.onCreate)
                this.onCreate(this.options); //Callback for connection success
        });

        this.client.on('data', (data) => { //Event for data reception
            var sz = this.merge ? this.merge + data.toString() : data.toString();
            var arr = sz.split('	');
            for (var n in arr) {
                if (sz.charAt(sz.length - 1) != '	' && n == arr.length - 1) {
                    this.merge = arr[n];
                    break;
                } else if (arr[n] == "") {
                    break;
                } else {
                    this.onRead(this.options, JSON.parse(arr[n]));
                }
            }
        });

        this.client.on('close', () => { //Triggering 'onEnd' function when 'close' event occurs in net
            if (this.onEnd)
                this.onEnd(this.options);
        });
        this.client.on('error', (err) => { //Triggering 'onError' function when 'error' event occurs in net
            if (this.onError)
                this.onError(this.options, err);
        })
    }
    write(packet) {
        this.client.write(JSON.stringify(packet) + "	"); //Send data
    }
}

module.exports = slTcpClient;