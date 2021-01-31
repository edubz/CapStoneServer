const osc = require('osc');
import { Response, Request } from "express";
import udpPort from "../controllers/createudpserver"
import websocketPort from "../controllers/createwebsocketport"
import { createOscMessage, oscMessage } from "../controllers/createoscmessage"
import { express } from "../app";

const oscRoute = (req: Request, res: Response) => {
    udpPort.on("message", (message: oscMessage) => {
        websocketPort.send(createOscMessage("osc", "f", message.args[0].value))
    })
    res.send("Send osc to this routes to relay it to max");
}

export { oscRoute, udpPort };