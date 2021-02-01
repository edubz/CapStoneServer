const osc = require("osc");
import { createUdpPort } from "../controllers/osc/createudpport"
import { oscMessage } from "../models/oscmessage";
import { createOscMessage } from "../controllers/osc/createoscmessage";
import { server } from "../server";

const testUdpHost = createUdpPort("0.0.0.0", 57121)
const testUdpSender = createUdpPort("0.0.0.0", 57120)

beforeAll((done) => {
    server.listen();
    testUdpHost.open();
    testUdpSender.open();
    done();
})

afterAll((done) => {
    server.close();
    testUdpHost.close();
    testUdpSender.close();
    done();
})

test('udp can start', async () => {
    var isReady = false;
    isReady = await new Promise((resolve) => {
        testUdpHost.on("ready", () => resolve(true));
    })
    expect(isReady).toBeTruthy();
});

test('udp does not throw err', () => {
    var hasError = false;
    testUdpHost.on("error", () => hasError = true);
    expect(hasError).toBeFalsy();
})

test('osc can recieve messages', async () => {

    testUdpSender.send(createOscMessage("/test", "s", "hi from test"), "0.0.0.0", 57121);

    let messageReceived = await new Promise((resolve) => {
        testUdpHost.on('message', (val: oscMessage) => {
            resolve(val.args[0].value);
        })
    });
    expect(messageReceived).toBe('hi from test');

})




