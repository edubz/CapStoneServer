const streamifier = require("streamifier");

import fs from "fs";
import { ObjectID } from "mongodb";
import multer from "multer";
import path from "path";
import { Request, Response } from "express";
import { database } from "../../models/mongoclient";
import { userChunks, userFiles } from "../../models/user-submitted-audio"
import { GridFSBucket } from "mongodb";

const uploadFileToDatabase = async (req: Request, res: Response) => {
    const fileBucket = new GridFSBucket(database.connection.db, { bucketName: "fsuser" });
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });
    upload.single('user_file')(req, res, (err: any) => {
        const readStream = streamifier.createReadStream(req.file.buffer);
        const uploadStream = fileBucket.openUploadStream(req.file.originalname);
        readStream.pipe(uploadStream).on("finish", () => res.redirect("/uploads"));
        if (err) res.send(err);
    })
}

const getAllFiles = async (req: Request, res: Response) => {
    const uploadedFiles = await userFiles.find({});
    res.send(uploadedFiles);
}

const deleteFile = async (req: Request, res: Response) => {
    console.log(req.query.name)
    const fileToDelete = await userFiles.find({ "filename": { $eq: req.query.name } });
    await userChunks.deleteMany({ files_id: fileToDelete[0]._id })
    await userFiles.deleteMany(fileToDelete[0]);

    try {
        res.send(`file: ${req.headers.params} deleted`)
    }
    catch (err) {
        res.send(err);
    }
}

const downloadFile = (req: Request, res: Response) => {
    let id = req.query.id?.toString();
    const fileBucket = new GridFSBucket(database.connection.db, { bucketName: "fsuser" });
    const fileToDownload = fileBucket.openDownloadStream(new ObjectID(id));
    const writePath = path.join(__dirname, "file.wav");
    const newFile = fs.createWriteStream(writePath);
    fileToDownload.pipe(newFile).on("finish", () => res.sendFile(writePath))
}

const sendUserUploadView = (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "..", "..", "/", "views", "/", "useruploadform.html"));
}

const sendUserFilesView = (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "..", "..", "/", "views", "/", "userfilesview.html"))
}

export { uploadFileToDatabase, getAllFiles, deleteFile, sendUserUploadView, sendUserFilesView, downloadFile }