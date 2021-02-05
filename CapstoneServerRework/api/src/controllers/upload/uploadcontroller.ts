import multer from "multer";
import { Request, Response } from "express";
import { database } from "../../models/mongoclient";
import { userChunks, userFiles } from "../../models/user-submitted-audio"
import { GridFSBucket } from "mongodb";
const streamifier = require("streamifier");

const uploadFileToDatabase = async (req: Request, res: Response) => {
    const fileBucket = new GridFSBucket(database.connection.db, { bucketName: "fsuser" });
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
    const uploadedFiles = await userFiles.find({});
    const fileView = uploadedFiles.map((curr: any) => {
        const filename = curr.toObject().filename;
        const uploadDate = curr.toObject().uploadDate;
        return `${filename} (created: ${uploadDate})`
    })
    res.send(fileView);
}

const deleteFile = async (req: Request, res: Response) => {
    const fileToDelete = await userFiles.find({ "filename": { $eq: req.headers.params } });
    await userFiles.deleteMany(fileToDelete[0]);
    await userChunks.deleteMany({ files_id: fileToDelete[0]._id })

    try {
        res.send(`file: ${req.headers.params} deleted`)
    }
    catch (err) {
        res.send(err);
    }
}

export { uploadFileToDatabase, getAllFiles, deleteFile }