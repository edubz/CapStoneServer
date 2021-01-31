const osc = require('osc')
import { oscRoute, udpPort } from "../routes/osc-receiver";
import { createOscMessage, oscMessage } from "../controllers/createoscmessage"

var isReady = false;

test('osc can start', async () => {
    isReady = await new Promise((resolve) => {
        udpPort.on("ready", () => resolve(true));
    })
    expect(isReady).toBeTruthy();
});

test('osc can recieve messages', async () => {
    const testUdpPort = new osc.UDPPort({
        localAddress: "0.0.0.0",
        localPort: 57120,
        metadata: false
    });
    testUdpPort.open();
    await testUdpPort.on("ready", function () {
        testUdpPort.send(createOscMessage("/test", "s", "hi from test"), "127.0.0.1", 57121);
    });

    let messageReceived = await new Promise((resolve) => {
        udpPort.on('message', (val: oscMessage) => {
            resolve(val.args[0]);
        })
    });

    udpPort.close();
    testUdpPort.close();
    expect(messageReceived).toBe('hi from test');

})




