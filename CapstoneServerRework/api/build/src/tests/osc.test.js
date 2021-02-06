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
const osc = require("osc");
const createudpport_1 = require("../controllers/osc/createudpport");
const createoscmessage_1 = require("../controllers/osc/createoscmessage");
const server_1 = require("../server");
const testUdpHost = createudpport_1.createUdpPort("0.0.0.0", 57121);
const testUdpSender = createudpport_1.createUdpPort("0.0.0.0", 57120);
beforeAll((done) => {
    server_1.server.listen();
    testUdpHost.open();
    testUdpSender.open();
    done();
});
afterAll((done) => {
    server_1.server.close();
    testUdpHost.close();
    testUdpSender.close();
    done();
});
test('udp can start', () => __awaiter(void 0, void 0, void 0, function* () {
    var isReady = false;
    isReady = yield new Promise((resolve) => {
        testUdpHost.on("ready", () => resolve(true));
    });
    expect(isReady).toBeTruthy();
}));
test('udp does not throw err', () => {
    var hasError = false;
    testUdpHost.on("error", () => hasError = true);
    expect(hasError).toBeFalsy();
});
test('osc can recieve messages', () => __awaiter(void 0, void 0, void 0, function* () {
    testUdpSender.send(createoscmessage_1.createOscMessage("/test", "s", "hi from test"), "0.0.0.0", 57121);
    let messageReceived = yield new Promise((resolve) => {
        testUdpHost.on('message', (val) => {
            resolve(val.args[0].value);
        });
    });
    expect(messageReceived).toBe('hi from test');
}));
