import express from "express";
import { getAllFiles, uploadFileToDatabase, deleteFile, sendGalleryUploadForm, sendGalleryView, downloadFile } from "../controllers/gallery/gallerycontroller";

const galleryRouter = express.Router();

galleryRouter.post("/", uploadFileToDatabase);
galleryRouter.get("/", sendGalleryView)
galleryRouter.delete("/", deleteFile);

galleryRouter.get("/data", getAllFiles);
galleryRouter.get("/file*", downloadFile);
galleryRouter.get("/testupload", sendGalleryUploadForm);

export { galleryRouter };