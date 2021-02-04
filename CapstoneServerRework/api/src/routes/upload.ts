import express, { Request, Response } from "express";
import path from "path";
import { database } from "../models/mongoclient";
import { uploadFileToDatabase } from "../controllers/upload/uploadcontroller"
const uploadRouter = express.Router();

const multer = require('multer');

uploadRouter.post("/", uploadFileToDatabase)

uploadRouter.put("/", (req: Request, res: Response) => {
    res.send(200);
})

var gridSchema = new database.Schema({}, { strict: false });
var files = database.model("File", gridSchema, "fs.files");
uploadRouter.get("/", async (req: Request, res: Response) => {
    const uploadedFiles = await files.find({});
    const fileView = uploadedFiles.map((curr: any) => {
        const filename = curr.toObject().filename;
        const uploadDate = curr.toObject().uploadDate;
        return `${filename} (created: ${uploadDate})`
    })
    res.send(fileView);
})

uploadRouter.get("/testupload", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "..", "/", "views", "/", "uploadform.html"));
})

uploadRouter.delete("/", (req: Request, res: Response) => {
    res.send(200);
})

export { uploadRouter };