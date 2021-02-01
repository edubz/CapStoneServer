const WebSocket = require('ws');

import { server } from "../../server"

const websocketServer = new WebSocket.Server({
    server: server
});

export { websocketServer }


