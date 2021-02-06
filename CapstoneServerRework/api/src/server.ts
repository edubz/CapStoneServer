import http from 'http';
import { app } from "./app";
import { udpHostPort } from "./models/udphostport";
import { handleWebSocketServer } from "./controllers/websockets/handlewebsocketserver";
import { database, dbURI, dbOptions } from "./models/mongoclient"
import { createDbConnection } from "./controllers/db/createdbconnection"

const port = 5000;

const server = http.createServer(app);
const webSocketServer = require("socket.io").listen(server);

if (process.env.NODE_ENV != "test") {
    server.listen(port, () => {
        console.log(`app listening at port: ${port}`);
        udpHostPort.open();
        createDbConnection(database, dbURI, dbOptions);
    })
}

udpHostPort.on("ready", console.log("osc could start"))

export { port, server, webSocketServer };