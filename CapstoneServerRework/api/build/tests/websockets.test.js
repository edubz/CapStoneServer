"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioClient = require("socket.io-client");
const server_1 = require("../server");
const handlewebsocketserver_1 = require("../controllers/websockets/handlewebsocketserver");
const createudpport_1 = require("../controllers/osc/createudpport");
const createoscmessage_1 = require("../controllers/osc/createoscmessage");
var isReady = false;
var hasError = false;
const testUdpHost = createudpport_1.createUdpPort("0.0.0.0", 57121);
const udpTestSender = createudpport_1.createUdpPort("0.0.0.0", 57120);
let socket;
beforeAll((done) => {
    server_1.server.listen(5000);
    testUdpHost.open();
    udpTestSender.open();
    server_1.webSocketServer.listen(server_1.server, handlewebsocketserver_1.handleWebSocketServer(server_1.webSocketServer));
    socket = ioClient(process.env.URL);
    done();
});
afterAll((done) => {
    server_1.server.close();
    udpTestSender.close();
    testUdpHost.close();
    socket.close();
    done();
});
test('web socket does not throw err', () => {
    server_1.webSocketServer.on("error", (err) => {
        hasError = true;
        throw err;
    });
    expect(hasError).toBeFalsy();
});
test("web socket accepts connections", () => __awaiter(void 0, void 0, void 0, function* () {
    isReady = yield new Promise((resolve) => {
        server_1.webSocketServer.on("connection", () => resolve(true));
    });
    expect(isReady).toBeTruthy();
}));
test("web sockets relay osc message", () => __awaiter(void 0, void 0, void 0, function* () {
    const testOscMessage = createoscmessage_1.createOscMessage("/test", "s", "hi from string");
    const messageReceived = yield new Promise((resolve) => {
        udpTestSender.send(testOscMessage);
        testUdpHost.on("message", (message) => {
            server_1.webSocketServer.emit('test message', message.args[0].value);
        });
        socket.on('test message', (message) => {
            resolve(message);
        });
    });
    expect(messageReceived).toBe(testOscMessage.args[0].value);
}));
