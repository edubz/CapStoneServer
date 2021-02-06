import express, { Request, Response } from "express";
import { uploadFileToDatabase, getAllFiles, deleteFile, sendUserUploadView, sendUserFilesView, downloadFile } from "../controllers/upload/uploadcontroller"

const uploadRouter = express.Router();

uploadRouter.post("/", uploadFileToDatabase)

//figure out if you can overwrite with post or if you need put
uploadRouter.put("/", (req: Request, res: Response) => {
    res.send(200);
})

uploadRouter.get("/", sendUserFilesView);

uploadRouter.get("/data", getAllFiles);
uploadRouter.get("/file*", downloadFile);

uploadRouter.delete("/", deleteFile)

uploadRouter.get("/testupload", sendUserUploadView)


export { uploadRouter };