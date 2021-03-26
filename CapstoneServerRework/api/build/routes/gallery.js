"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.galleryRouter = void 0;
const express_1 = __importDefault(require("express"));
const gallerycontroller_1 = require("../controllers/gallery/gallerycontroller");
const galleryRouter = express_1.default.Router();
exports.galleryRouter = galleryRouter;
galleryRouter.post("/", gallerycontroller_1.uploadFileToDatabase);
galleryRouter.get("/", gallerycontroller_1.sendGalleryView);
galleryRouter.delete("/", gallerycontroller_1.deleteFile);
galleryRouter.get("/data", gallerycontroller_1.getAllFiles);
galleryRouter.get("/file*", gallerycontroller_1.downloadFile);
galleryRouter.get("/testupload", gallerycontroller_1.sendGalleryUploadForm);
