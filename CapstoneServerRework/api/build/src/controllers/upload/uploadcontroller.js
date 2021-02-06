"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFile = exports.sendUserFilesView = exports.sendUserUploadView = exports.deleteFile = exports.getAllFiles = exports.uploadFileToDatabase = void 0;
const streamifier = require("streamifier");
const fs_1 = __importDefault(require("fs"));
const mongodb_1 = require("mongodb");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const mongoclient_1 = require("../../models/mongoclient");
const user_submitted_audio_1 = require("../../models/user-submitted-audio");
const mongodb_2 = require("mongodb");
const uploadFileToDatabase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileBucket = new mongodb_2.GridFSBucket(mongoclient_1.database.connection.db, { bucketName: "fsuser" });
    const storage = multer_1.default.memoryStorage();
    const upload = multer_1.default({ storage: storage });
    upload.single('user_file')(req, res, (err) => {
        const readStream = streamifier.createReadStream(req.file.buffer);
        const uploadStream = fileBucket.openUploadStream(req.file.originalname);
        readStream.pipe(uploadStream).on("finish", () => res.redirect("/uploads"));
        if (err)
            res.send(err);
    });
});
exports.uploadFileToDatabase = uploadFileToDatabase;
const getAllFiles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadedFiles = yield user_submitted_audio_1.userFiles.find({});
    res.send(uploadedFiles);
});
exports.getAllFiles = getAllFiles;
const deleteFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query.name);
    const fileToDelete = yield user_submitted_audio_1.userFiles.find({ "filename": { $eq: req.query.name } });
    yield user_submitted_audio_1.userChunks.deleteMany({ files_id: fileToDelete[0]._id });
    yield user_submitted_audio_1.userFiles.deleteMany(fileToDelete[0]);
    try {
        res.send(`file: ${req.headers.params} deleted`);
    }
    catch (err) {
        res.send(err);
    }
});
exports.deleteFile = deleteFile;
const downloadFile = (req, res) => {
    var _a;
    let id = (_a = req.query.id) === null || _a === void 0 ? void 0 : _a.toString();
    const fileBucket = new mongodb_2.GridFSBucket(mongoclient_1.database.connection.db, { bucketName: "fsuser" });
    const fileToDownload = fileBucket.openDownloadStream(new mongodb_1.ObjectID(id));
    const writePath = path_1.default.join(__dirname, "file.wav");
    const newFile = fs_1.default.createWriteStream(writePath);
    fileToDownload.pipe(newFile).on("finish", () => res.sendFile(writePath));
};
exports.downloadFile = downloadFile;
const sendUserUploadView = (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "..", "..", "/", "views", "/", "useruploadform.html"));
};
exports.sendUserUploadView = sendUserUploadView;
const sendUserFilesView = (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "..", "..", "/", "views", "/", "userfilesview.html"));
};
exports.sendUserFilesView = sendUserFilesView;
