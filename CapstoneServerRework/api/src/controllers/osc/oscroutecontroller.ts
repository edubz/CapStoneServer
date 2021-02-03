import path from "path";
import { Request, Response } from "express";
export const sendOscView = (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "..", "..", "views", "oscview.html"));
}