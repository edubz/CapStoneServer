import express from "express";
import { Response, Request } from "express";
import { getAllDevices, createNewDeviceListing, deleteDeviceListing } from "../controllers/devices/devicescontroller"

const devicesRouter = express.Router();

devicesRouter.get("/", getAllDevices)

devicesRouter.post("/", createNewDeviceListing)

//todo: add update functionality
devicesRouter.put("/", (req: Request, res: Response) => {
    res.sendStatus(200);
})

devicesRouter.delete("/", deleteDeviceListing)


export { devicesRouter };