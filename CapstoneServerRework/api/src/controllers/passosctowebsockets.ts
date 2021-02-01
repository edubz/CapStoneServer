import { udpHostPort } from "../models/udphostport"
import { webSocketServer } from "../server"
import { oscMessage } from "../models/oscmessage"

export const passOscToWebsockets = () => {
    udpHostPort.on("message", (message: oscMessage) => {
        webSocketServer.emit("osc message", message);
    })
}

