"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passOscToWebsockets = void 0;
const udphostport_1 = require("../models/udphostport");
const server_1 = require("../server");
const passOscToWebsockets = () => {
    udphostport_1.udpHostPort.on("message", (message) => {
        console.log('message');
        server_1.webSocketServer.emit("osc message", message);
    });
};
exports.passOscToWebsockets = passOscToWebsockets;
