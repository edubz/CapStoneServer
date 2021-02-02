import express from "express";
import { Response, Request } from "express";
const devicesRouter = express.Router();

devicesRouter.get("/", (req: Request, res: Response) => {
    res.sendStatus(200);
})
devicesRouter.post("/", (req: Request, res: Response) => {
    res.sendStatus(200);
})

devicesRouter.delete("/", (req: Request, res: Response) => {
    res.sendStatus(200);
})

devicesRouter.put("/", (req: Request, res: Response) => {
    res.sendStatus(200);
})

export { devicesRouter };