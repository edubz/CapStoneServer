const osc = require('osc');
const udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57121,
    metadata: true
});
udpPort.open();

export default udpPort;
