const http = require('http');
import { app } from "./app";
import { udpHostPort } from "./models/udphostport";
import { handleWebSocketServer } from "./controllers/websockets/handlewebsocketserver";
import { database } from "./models/mongoclient"
import { handleDbConnection } from "./controllers/db/handledbconnection";
const port = 5000;

const server = http.createServer(app);
const webSocketServer = require("socket.io").listen(server);

if (process.env.NODE_ENV != "test") {
    server.listen(port, () => {
        console.log(`app listening at port: ${port}`);
        udpHostPort.open();
        webSocketServer.listen(server, handleWebSocketServer(webSocketServer))
        database.connect((err: Error) => handleDbConnection(database, err))
    })
}

export { port, server, webSocketServer };