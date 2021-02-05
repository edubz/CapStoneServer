import express, { Request, Response } from "express";
import path from "path";
import { uploadFileToDatabase, getAllFiles, deleteFile, sendUserUploadView } from "../controllers/upload/uploadcontroller"

const uploadRouter = express.Router();

uploadRouter.post("/", uploadFileToDatabase)

//figure out if you can overwrite with post or if you need put
uploadRouter.put("/", (req: Request, res: Response) => {
    res.send(200);
})

uploadRouter.get("/", getAllFiles)

uploadRouter.delete("/", deleteFile)

uploadRouter.get("/testupload", sendUserUploadView)


export { uploadRouter };