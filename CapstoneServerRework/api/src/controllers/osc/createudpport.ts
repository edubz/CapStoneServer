const osc = require("osc");

export function createUdpPort(address: string, port: number) {
    return new osc.UDPPort({
        localAddress: address,
        localPort: port,
        metadata: true
    })
}
