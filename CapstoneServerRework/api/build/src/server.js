"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webSocketServer = exports.server = exports.port = void 0;
const http_1 = __importDefault(require("http"));
const app_1 = require("./app");
const mongoclient_1 = require("./models/mongoclient");
const createdbconnection_1 = require("./controllers/db/createdbconnection");
const osc = require("osc");
const port = 5000;
exports.port = port;
const server = http_1.default.createServer(app_1.app);
exports.server = server;
const webSocketServer = require("socket.io")(server);
exports.webSocketServer = webSocketServer;
const testUdpPort = new osc.UDPPort({
    localAddress: "127.0.0.1",
    localPort: 57121,
    metadata: true
});
if (process.env.NODE_ENV != "test") {
    server.listen(port, () => {
        console.log(`app listening at port: ${port}`);
        testUdpPort.open();
        createdbconnection_1.createDbConnection(mongoclient_1.database, mongoclient_1.dbURI, mongoclient_1.dbOptions);
        testUdpPort.on("ready", () => console.log("osc started"));
        testUdpPort.on("error", (err) => console.log(err));
        testUdpPort.on("message", (m) => console.log(m));
    });
}
