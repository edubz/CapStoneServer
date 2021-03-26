"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userChunks = exports.userFiles = void 0;
const mongoclient_1 = require("./mongoclient");
const gridSchema = new mongoclient_1.database.Schema({}, { strict: false });
const userFiles = mongoclient_1.database.model("UserFile", gridSchema, "fsuser.files");
exports.userFiles = userFiles;
const userChunks = mongoclient_1.database.model("UserChunk", gridSchema, "fsuser.chunks");
exports.userChunks = userChunks;
