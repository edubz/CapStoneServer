const http = require('http');
import { app } from "./app";
import { oscMessage } from "./models/oscmessage";
import { udpHostPort } from "./models/udphostport";
import { passOscToWebsockets } from "./controllers/passosctowebsockets"
// import { websocketServer } from "./controllers/websockets/createwebsocketsserver"
// const WebSocket = require('ws');
const port = 5000;

const server = http.createServer(app);
const webSocketServer = require("socket.io").listen(server);

if (process.env.NODE_ENV != "test") {
    server.listen(port, () => {
        console.log(`app listening at port: ${port}`);
        udpHostPort.open();
        webSocketServer.on("connection", passOscToWebsockets)
    })
}

export { port, server, webSocketServer };