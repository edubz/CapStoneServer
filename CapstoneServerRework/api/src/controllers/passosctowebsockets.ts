import { udpHostPort } from "../models/udphostport"
import { webSocketServer } from "../server"
import { oscMessage } from "../models/oscmessage"
import { parseOscMessagetoArray } from "./osc/parsemessages"

export const passOscToWebsockets = () => {
    udpHostPort.on("message", (message: oscMessage) => {
        const messageArray = parseOscMessagetoArray(message);
        webSocketServer.emit("osc message", messageArray);
    })
}
