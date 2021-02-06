"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.galleryChunks = exports.galleryFiles = void 0;
const mongoclient_1 = require("./mongoclient");
const gridSchema = new mongoclient_1.database.Schema({}, { strict: false });
const galleryFiles = mongoclient_1.database.model("GalleryFile", gridSchema, "fsgallery.files");
exports.galleryFiles = galleryFiles;
const galleryChunks = mongoclient_1.database.model("GalleryChunk", gridSchema, "fsgallery.chunks");
exports.galleryChunks = galleryChunks;
