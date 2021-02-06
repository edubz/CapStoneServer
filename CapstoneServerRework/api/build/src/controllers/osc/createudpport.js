"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUdpPort = void 0;
const osc = require("osc");
function createUdpPort(address, port) {
    return new osc.UDPPort({
        localAddress: address,
        localPort: port,
        metadata: true
    });
}
exports.createUdpPort = createUdpPort;
