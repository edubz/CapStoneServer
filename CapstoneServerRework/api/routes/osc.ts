const osc = require("osc");
import express from "express";
import { udpHostPort } from "../models/udpHostPort";
import { Response, Request } from "express";
import { oscMessage } from "../models/oscmessage";
const oscRouter = express.Router();

oscRouter.get("/osc", (req: Request, res: Response) => {
    var staticMessage;
    udpHostPort.on("message", (message: oscMessage) => {
        staticMessage = message;
    })
    if (staticMessage == undefined) res.send('awaiting osc data');
    else res.send(`osc snapshot: ${staticMessage}`);
})

export { oscRouter };