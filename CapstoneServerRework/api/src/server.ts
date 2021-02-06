import http from 'http';
import { app } from "./app";
import { udpHostPort } from "./models/udphostport";
import { handleWebSocketServer } from "./controllers/websockets/handlewebsocketserver";
import { database, dbURI, dbOptions } from "./models/mongoclient"
import { createDbConnection } from "./controllers/db/createdbconnection"
import { oscMessage } from './models/oscmessage';

const osc = require("osc");
const port = 5000;

const server = http.createServer(app);
const webSocketServer = require("socket.io")(server);

// const testUdpPort = new osc.UDPPort({
//     localAddress: "159.203.191.234",
//     localPort: 57121,
//     metadata: true
// })

if (process.env.NODE_ENV != "test") {
    server.listen(port, () => {
        console.log(`app listening at port: ${port}`);
        udpHostPort.open();
        createDbConnection(database, dbURI, dbOptions);
        udpHostPort.on("ready", () => console.log("osc started"))
        udpHostPort.on("error", (err: any) => console.log(err))
        udpHostPort.on("message", (m: oscMessage) => console.log(m))
    })
}

export { port, server, webSocketServer };