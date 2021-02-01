import { udpHostPort } from "../models/udphostport"
import { websocketServer } from "../controllers/websockets/createwebsocketsserver"

udpHostPort.on("ready", () => {
    udpHostPort.on("message", (message) => {
        websocketServer.send(message);
    })
})

