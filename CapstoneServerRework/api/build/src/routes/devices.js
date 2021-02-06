"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.devicesRouter = void 0;
const express_1 = __importDefault(require("express"));
const devicescontroller_1 = require("../controllers/devices/devicescontroller");
const devicesRouter = express_1.default.Router();
exports.devicesRouter = devicesRouter;
devicesRouter.post("/", devicescontroller_1.createNewDeviceListing);
devicesRouter.get("/", devicescontroller_1.sendDevicesView);
//todo: add update functionality
devicesRouter.put("/", (req, res) => {
    res.sendStatus(200);
});
devicesRouter.delete("/", devicescontroller_1.deleteDeviceListing);
devicesRouter.get("/data", devicescontroller_1.getAllDevices);
devicesRouter.get("/testregister", devicescontroller_1.sendRegisterForm);
