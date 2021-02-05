const streamifier = require("streamifier");

import multer from "multer";
import { Request, Response } from "express";
import { GridFSBucket } from "mongodb";
import { database } from "../../models/mongoclient";
import { galleryChunks, galleryFiles } from "../../models/gallery-audio";

const uploadFileToDatabase = async (req: Request, res: Response) => {
    const fileBucket = new GridFSBucket(database.connection.db, { bucketName: "fsgallery" });
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });
    upload.single('uploaded_file')(req, res, (err: any) => {
        const readStream = streamifier.createReadStream(req.file.buffer);
        const uploadStream = fileBucket.openUploadStream(req.file.originalname);
        readStream.pipe(uploadStream).on("finish", () => res.redirect("/upload"));
        if (err) res.send(err);
    })
}

const getAllFiles = async (req: Request, res: Response) => {
    const uploadedFiles = await galleryFiles.find({});
    const fileView = uploadedFiles.map((curr: any) => {
        const filename = curr.toObject().filename;
        const uploadDate = curr.toObject().uploadDate;
        return `${filename} (created: ${uploadDate})`
    })
    res.send(fileView);
}

const deleteFile = async (req: Request, res: Response) => {
    const filetoDelete = await galleryFiles.find({ "filename": req.headers.params });
    await galleryFiles.deleteOne(filetoDelete[0]);
    await galleryChunks.deleteMany({ files_id: filetoDelete[0]._id })

    try {
        res.send(`file: ${req.headers.params} deleted`)
    }
    catch (err) {
        res.send(err);
    }
}

export { uploadFileToDatabase, getAllFiles, deleteFile }

