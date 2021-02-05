import express from "express";
import { getAllFiles, uploadFileToDatabase, deleteFile } from "../controllers/gallery/gallerycontroller";

const galleryRouter = express.Router();

galleryRouter.post("/", uploadFileToDatabase);
galleryRouter.get("/", getAllFiles);
galleryRouter.delete("/", deleteFile);

export { galleryRouter };