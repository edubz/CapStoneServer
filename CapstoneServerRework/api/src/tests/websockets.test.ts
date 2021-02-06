const ioClient = require("socket.io-client");

import { server, webSocketServer } from "../server"
import { handleWebSocketServer } from "../controllers/websockets/handlewebsocketserver"

import { createUdpPort } from "../controllers/osc/createudpport";
import { createOscMessage } from "../controllers/osc/createoscmessage";
import { oscMessage } from "../models/oscmessage";

var isReady = false;
var hasError = false;

const testUdpHost = createUdpPort("0.0.0.0", 57121)
const udpTestSender = createUdpPort("0.0.0.0", 57120)
let socket: any;
beforeAll((done) => {
    server.listen(5000);
    testUdpHost.open();
    udpTestSender.open();
    webSocketServer.listen(server, handleWebSocketServer(webSocketServer))
    socket = ioClient(process.env.URL);
    done();
})

afterAll((done) => {
    server.close();
    udpTestSender.close();
    testUdpHost.close();
    socket.close();
    done();
})

test('web socket does not throw err', () => {
    webSocketServer.on("error", (err: any) => {
        hasError = true
        throw err;
    });
    expect(hasError).toBeFalsy();
})

test("web socket accepts connections", async () => {
    isReady = await new Promise((resolve) => {
        webSocketServer.on("connection", () => resolve(true));
    })
    expect(isReady).toBeTruthy();
})

test("web sockets relay osc message", async () => {
    const testOscMessage = createOscMessage("/test", "s", "hi from string")

    const messageReceived: String = await new Promise((resolve) => {

        udpTestSender.send(testOscMessage);

        testUdpHost.on("message", (message: oscMessage) => {
            webSocketServer.emit('test message', message.args[0].value);
        })

        socket.on('test message', (message: string) => {
            resolve(message);
        })

    })
    expect(messageReceived).toBe(testOscMessage.args[0].value)
})


