import express from "express";
import { Response, Request } from "express";
import { getAllDevices, createNewDeviceListing, deleteDeviceListing, sendDevicesView, sendRegisterForm } from "../controllers/devices/devicescontroller"

const devicesRouter = express.Router();

devicesRouter.post("/", createNewDeviceListing);

devicesRouter.get("/", sendDevicesView);

//todo: add update functionality
devicesRouter.put("/", (req: Request, res: Response) => {
    res.sendStatus(200);
})

devicesRouter.delete("/", deleteDeviceListing);

devicesRouter.get("/data", getAllDevices);

devicesRouter.get("/testregister", sendRegisterForm)

export { devicesRouter };