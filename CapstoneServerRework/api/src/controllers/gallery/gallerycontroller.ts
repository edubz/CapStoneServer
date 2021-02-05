const streamifier = require("streamifier");

import multer from "multer";
import path from "path";
import fs from "fs";
import { Request, Response } from "express";
import { GridFSBucket, ObjectID } from "mongodb";
import { database } from "../../models/mongoclient";
import { galleryChunks, galleryFiles } from "../../models/gallery-audio";

const uploadFileToDatabase = (req: Request, res: Response) => {
    const fileBucket = new GridFSBucket(database.connection.db, { bucketName: "fsgallery" });
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });
    upload.single('gallery_file')(req, res, (err: any) => {
        const readStream = streamifier.createReadStream(req.file.buffer);
        const uploadStream = fileBucket.openUploadStream(req.file.originalname);
        readStream.pipe(uploadStream).on("finish", () => res.sendStatus(200));
        if (err) res.send(err);
    })
}

const getAllFiles = async (req: Request, res: Response) => {
    const uploadedFiles = await galleryFiles.find({});
    res.send(uploadedFiles);
}

const deleteFile = async (req: Request, res: Response) => {
    const filetoDelete = await galleryFiles.find({ "filename": req.query.name });
    await galleryChunks.deleteMany({ files_id: filetoDelete[0]._id })
    await galleryFiles.deleteOne(filetoDelete[0]);

    try {
        res.send(`file: ${req.query.name} deleted`)
    }
    catch (err) {
        res.send(err);
    }
}

const downloadFile = (req: Request, res: Response) => {
    let id = req.query.id?.toString();
    const fileBucket = new GridFSBucket(database.connection.db, { bucketName: "fsgallery" });
    const fileToDownload = fileBucket.openDownloadStream(new ObjectID(id));
    const writePath = path.join(__dirname, "file.wav");
    const newFile = fs.createWriteStream(writePath);
    fileToDownload.pipe(newFile).on("finish", () => res.sendFile(writePath))
}

const sendGalleryView = (req: Request, res: Response) => {
    const galleryViewPath = path.join(__dirname, "..", "..", "views", "galleryfilesview.html")
    res.sendFile(galleryViewPath);
}

const sendGalleryUploadForm = (req: Request, res: Response) => {
    const galleryFormPath = path.join(__dirname, "..", "..", "views", "galleryuploadform.html")
    res.sendFile(galleryFormPath);
}

export { uploadFileToDatabase, getAllFiles, deleteFile, sendGalleryUploadForm, sendGalleryView, downloadFile }

