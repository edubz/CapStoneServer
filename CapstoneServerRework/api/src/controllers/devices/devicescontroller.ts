import { Request, Response } from "express";
import { devices } from "../../models/device"

const getAllDevices = async (req: Request, res: Response) => {
    const allDevices = await devices.find({});
    try {
        res.send(allDevices);
    }
    catch (err: any) {
        res.send(err);
    }
}

const createNewDeviceListing = async (req: Request, res: Response) => {
    await devices.create(req.body);
    try {
        res.json(`created document: ${req.body.toString()}`);
    }
    catch (err) {
        res.json(err);
    }

}

const deleteDeviceListing = async (req: Request, res: Response) => {
    await devices.deleteOne(req.body);
    try {
        res.send("deleted data");
    }
    catch (err: any) {
        throw err;
        res.sendStatus(500);
    }
}

export { getAllDevices, createNewDeviceListing, deleteDeviceListing };