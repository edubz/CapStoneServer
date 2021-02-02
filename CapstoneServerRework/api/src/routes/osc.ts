const path = require("path");
import express from "express";
import { Response, Request } from "express";
const oscRouter = express.Router();

oscRouter.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "..", "views", "oscview.html"));
})

export { oscRouter };