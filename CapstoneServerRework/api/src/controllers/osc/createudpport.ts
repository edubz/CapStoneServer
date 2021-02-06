const osc = require("osc");

export function createUdpPort(address: string, port: number) {
    return new osc.UDPPort();
}
