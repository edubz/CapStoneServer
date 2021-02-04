import multer from "multer";
import { Request, Response } from "express";
import { database } from "../../models/mongoclient"
import { GridFSBucket } from "mongodb";
const streamifier = require("streamifier");

export const uploadFileToDatabase = (req: Request, res: Response) => {
    var fileBucket = new GridFSBucket(database.connection.db);
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });
    upload.single('uploaded_file')(req, res, (err: any) => {
        const readStream = streamifier.createReadStream(req.file.buffer);
        const uploadStream = fileBucket.openUploadStream(req.file.originalname);
        readStream.pipe(uploadStream).on("finish", () => res.redirect("/upload"))
    })
}