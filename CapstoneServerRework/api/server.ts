import { app } from "./app"
const WebSocket = require('ws');
const port = 5000;

var websocketServer;
if (process.env.NODE_ENV != "test") {
    const server = app.listen(port, () => console.log(`app listening at port: ${port}`));
    websocketServer = new WebSocket.Server({
        server: server
    })
}

export { port, websocketServer };