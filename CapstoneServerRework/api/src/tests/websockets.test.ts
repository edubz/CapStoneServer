import { server } from "../server"
const io = require("socket.io")(server);
const ioClient = require("socket.io-client");

import { createUdpPort } from "../controllers/osc/createudpport";
import { createOscMessage } from "../controllers/osc/createoscmessage";
import { oscMessage } from "../models/oscmessage";

var isReady = false;
var hasError = false;

beforeAll((done) => {
    server.listen(5000, done);
})

afterAll((done) => {
    server.close();
    done();
})

test('web socket does not throw err', () => {
    io.on("error", (err: any) => {
        hasError = true
        throw err;
    });
    expect(hasError).toBeFalsy();
})

test("web socket accepts connections", async () => {
    isReady = await new Promise((resolve) => {
        io.on("connection", () => resolve(true));
    })
    expect(isReady).toBeTruthy();
})

const socket = ioClient("localhost:5000");
test("web sockets relay osc message", async () => {
    const testUdpHost = createUdpPort("0.0.0.0", 57121)
    const udpTestSender = createUdpPort("0.0.0.0", 57120)
    testUdpHost.open();
    udpTestSender.open();
    const testOscMessage = createOscMessage("/test", "s", "hi from string")

    const messageReceived: String = await new Promise((resolve) => {

        udpTestSender.send(testOscMessage);

        testUdpHost.on("message", (message: oscMessage) => {
            io.emit('test message', message.args[0].value);
        })

        socket.on('test message', (message: string) => {
            udpTestSender.close(testUdpHost.close(resolve(message)));
        })

    })
    expect(messageReceived).toBe(testOscMessage.args[0].value)
})
