import { Request, Response } from "express";
import path from "path";
import { devices } from "../../models/device"

const getAllDevices = async (req: Request, res: Response) => {
    const allDevices = await devices.find({});
    try {
        res.status(200).send(allDevices);
    }
    catch (err: any) {
        res.status(500).send(err);
    }
}

const createNewDeviceListing = async (req: Request, res: Response) => {
    console.log(req.body);
    await devices.create(req.body);
    try {
        res.end();
    }
    catch (err) {
        res.status(500).send(err);
    }
}

const deleteDeviceListing = async (req: Request, res: Response) => {
    await devices.deleteOne(req.body);
    try {
        res.sendStatus(200);
    }
    catch (err: any) {
        res.status(500).send(err);
    }
}

const sendDevicesView = (req: Request, res: Response) => {
    const deviceViewPath = path.join(__dirname, "..", "..", "views", "devicesview.html");
    res.sendFile(deviceViewPath);
};

const sendRegisterForm = (req: Request, res: Response) => {
    const registerFormPath = path.join(__dirname, "..", "..", "views", "deviceregisterform.html");
    res.sendFile(registerFormPath);
}

export { getAllDevices, createNewDeviceListing, deleteDeviceListing, sendDevicesView, sendRegisterForm };