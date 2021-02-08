import path from "path";
import { Request, Response } from "express";

export const sendHomeView = (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "..", "..", "views", "homeview.html"));
}
