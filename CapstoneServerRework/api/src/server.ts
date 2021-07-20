import http from 'http';
import { app } from "./app";
import { udpHostPort } from "./models/udphostport";
import { database, dbURI, dbOptions } from "./models/mongoclient"
import { createDbConnection } from "./controllers/db/createdbconnection"
import { oscMessage } from './models/oscmessage';
import { passOscToWebsockets } from './controllers/passosctowebsockets';

const port = 5000;

const server = http.createServer(app);
const webSocketServer = require("socket.io")(server);

if (process.env.NODE_ENV != "test") {
    server.listen(port, () => {
        console.log(`app listening at port: ${port}`);
        udpHostPort.open();
        createDbConnection(database, dbURI, dbOptions);
        udpHostPort.on("ready", () => console.log("osc started"))
        udpHostPort.on("error", (err: any) => console.log(err))
        passOscToWebsockets();
    })
}

export { port, server, webSocketServer };
