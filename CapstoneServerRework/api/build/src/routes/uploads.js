"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRouter = void 0;
const express_1 = __importDefault(require("express"));
const uploadcontroller_1 = require("../controllers/upload/uploadcontroller");
const uploadRouter = express_1.default.Router();
exports.uploadRouter = uploadRouter;
uploadRouter.post("/", uploadcontroller_1.uploadFileToDatabase);
//figure out if you can overwrite with post or if you need put
uploadRouter.put("/", (req, res) => {
    res.send(200);
});
uploadRouter.get("/", uploadcontroller_1.sendUserFilesView);
uploadRouter.get("/data", uploadcontroller_1.getAllFiles);
uploadRouter.get("/file*", uploadcontroller_1.downloadFile);
uploadRouter.delete("/", uploadcontroller_1.deleteFile);
uploadRouter.get("/testupload", uploadcontroller_1.sendUserUploadView);
