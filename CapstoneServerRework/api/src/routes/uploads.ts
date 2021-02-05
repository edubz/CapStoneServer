import express, { Request, Response } from "express";
import path from "path";
import { uploadFileToDatabase, getAllFiles, deleteFile } from "../controllers/upload/uploadcontroller"

const uploadRouter = express.Router();

uploadRouter.post("/", uploadFileToDatabase)

uploadRouter.put("/", (req: Request, res: Response) => {
    res.send(200);
})

uploadRouter.get("/", getAllFiles)

uploadRouter.delete("/", deleteFile)

uploadRouter.get("/testupload", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "..", "/", "views", "/", "uploadform.html"));
})


export { uploadRouter };