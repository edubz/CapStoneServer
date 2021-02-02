import { webSocketServer } from "../../server"
import { passOscToWebsockets } from "../passosctowebsockets"

export const handleWebSocketServer = (websocketServer: any) => {
    webSocketServer.on("connection", passOscToWebsockets)
    webSocketServer.on("error", (err: Error) => console.log(err))
}