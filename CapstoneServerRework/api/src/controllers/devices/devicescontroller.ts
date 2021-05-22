import { Request, Response } from "express";
import path from "path";
import { devices } from "../../models/device";
import { serialNumbers } from "../../models/serial-numbers";

const getAllDevices = async (req: Request, res: Response) => {
    const allDevices = await devices.find({});
    try {
        res.status(200).send(allDevices);
    }
    catch (err: any) {
        res.status(500).send(err);
    }
}

const getDeviceByID = async (req: Request, res: Response) => {
    const serialNumber = req.query.id;
    const device = await devices.findOne({ id: serialNumber })
    res.status(200).send(device.name);
}

const createNewDeviceListing = async (req: Request, res: Response) => {
    console.log(req.body);
    
    if (serialNumbers.includes(req.body.id)) {
        await devices.create(req.body);
        try {
            res.end();
        }
        catch (err) {
            res.status(500).send(err);
        }
    } else {
        res.sendStatus(500);
    }
}

const deleteDeviceListing = async (req: Request, res: Response) => {
    await devices.deleteOne(req.query);
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

export { getAllDevices, createNewDeviceListing, deleteDeviceListing, sendDevicesView, sendRegisterForm, getDeviceByID };