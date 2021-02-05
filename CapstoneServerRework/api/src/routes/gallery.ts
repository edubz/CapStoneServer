import express from "express";
import { getAllFiles, uploadFileToDatabase, deleteFile, sendGalleryView } from "../controllers/gallery/gallerycontroller";

const galleryRouter = express.Router();

galleryRouter.post("/", uploadFileToDatabase);
galleryRouter.get("/", getAllFiles);
galleryRouter.delete("/", deleteFile);
galleryRouter.get("/testupload", sendGalleryView)

export { galleryRouter };