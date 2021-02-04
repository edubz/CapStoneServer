import express, { Request, Response } from "express";
import { Readable } from "stream";
import { database } from "../models/mongoclient";
const uploadRouter = express.Router();

var fs = require('fs');
var Grid = require('gridfs-stream');
const multer = require('multer');

uploadRouter.post("/", (res: Response, req: Request) => {
    const storage = multer.memoryStorage()
    const upload = multer({ storage: storage });
    upload.single('file')(req, res, (err: Error) => {
        const uploadName = req.body.name;

        let filestreamInput = new Readable();
        filestreamInput.push(req.file.buffer);
        filestreamInput.push(null);

        let bucket = Grid(database.connection.db, database.mongo);
        let filestreamDestination = GridFS.createWriteStream({
            filename: uploadName
        });
        filestreamInput.pipe(filestreamDestination);


    })

    var GridFS = Grid(database.connection.db, database.mongo);

    function putFile(path: String, name: String, callback: Function) {
        var writestream = GridFS.createWriteStream({
            filename: name
        });
        writestream.on('close', function (file: File) {
            callback(null, file);
        });
        fs.createReadStream(path).pipe(writestream);
    }
})

uploadRouter.put("/", (req: Request, res: Response) => {
    res.send(200);
})

uploadRouter.get("/", (req: Request, res: Response) => {
    res.send(200);
})

uploadRouter.delete("/", (req: Request, res: Response) => {
    res.send(200);
})