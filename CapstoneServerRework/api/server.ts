const http = require('http');
import { app } from "./app";
const WebSocket = require('ws');
const port = 5000;

const server = http.createServer(app);

if (process.env.NODE_ENV != "test") {
    server.listen(port, () => console.log(`app listening at port: ${port}`));
}

export { port, server };