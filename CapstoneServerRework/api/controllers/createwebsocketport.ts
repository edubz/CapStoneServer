const osc = require('osc');
const websocketPort = new osc.WebSocketPort({
    url: "ws://localhost:5000",
    metadata: true
});
websocketPort.open();
export default websocketPort;