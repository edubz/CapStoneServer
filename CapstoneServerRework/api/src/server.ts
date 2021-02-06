import http from 'http';
import { app } from "./app";
import { udpHostPort } from "./models/udphostport";
import { handleWebSocketServer } from "./controllers/websockets/handlewebsocketserver";
import { database, dbURI, dbOptions } from "./models/mongoclient"
import { createDbConnection } from "./controllers/db/createdbconnection"

const osc = require("osc");
const port = 5000;

const server = http.createServer(app);
const webSocketServer = require("socket.io")(server);

const testUdpPort = new osc.UDPPort({
    localAddress: "127.0.0.1",
    localPort: 57121,
    metadata: true
})

if (process.env.NODE_ENV != "test") {
    server.listen(port, () => {
        console.log(`app listening at port: ${port}`);
        testUdpPort.open();
        createDbConnection(database, dbURI, dbOptions);
        testUdpPort.on("ready", () => console.log("osc started"))
        testUdpPort.on("error", (err: any) => console.log(err))
    })
}

export { port, server, webSocketServer };