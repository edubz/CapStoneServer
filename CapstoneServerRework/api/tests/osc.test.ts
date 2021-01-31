const osc = require('osc')
const WebSocket = require('ws');
import { oscRoute, udpPort } from "../routes/osc";
import { createOscMessage, oscMessage } from "../controllers/createoscmessage"
import { app } from "../app"
import websocketPort from "../controllers/createwebsocketport";
import { Server } from "http";

var isReady = {
    "udp": false,
    "ws": false
};

var hasError = {
    "udp": false,
    "ws": false
};
var testHttpServer: Server;
var testWsServer: Server;
beforeAll(() => {
    testHttpServer = app.listen(5000);
    testWsServer = new WebSocket.Server({
        server: testHttpServer
    })
})

afterAll(async () => {
    await udpPort.close();
    testWsServer.close();
    testHttpServer.close();

})

test('udp can start', async () => {
    isReady.udp = await new Promise((resolve) => {
        udpPort.on("ready", () => resolve(true));
    })
    expect(isReady.udp).toBeTruthy();
});

test('udp does not throw err', () => {
    udpPort.on("error", () => hasError.udp = true);
    expect(hasError.udp).toBeFalsy();
})

test('osc can recieve messages', async () => {
    const testUdpPort = new osc.UDPPort({
        localAddress: "0.0.0.0",
        localPort: 57120,
        metadata: true
    });
    testUdpPort.open();
    await testUdpPort.on("ready", function () {
        testUdpPort.send(createOscMessage("/test", "s", "hi from test"), "127.0.0.1", 57121);
    });

    let messageReceived = await new Promise((resolve) => {
        udpPort.on('message', (val: oscMessage) => {
            resolve(val.args[0].value);
        })
    });
    testUdpPort.close();
    expect(messageReceived).toBe('hi from test');

})

test('web socket does not throw err', () => {
    websocketPort.on("error", () => hasError.udp = true);
    expect(hasError.ws).toBeFalsy();
})

test("web socket accepts connections", async () => {
    isReady.ws = await new Promise((resolve) => {
        testWsServer.on("connection", () => resolve(true));
    })
    expect(isReady.ws).toBeTruthy();
})






