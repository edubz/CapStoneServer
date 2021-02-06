"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const osc_1 = require("./routes/osc");
const devices_1 = require("./routes/devices");
const uploads_1 = require("./routes/uploads");
const gallery_1 = require("./routes/gallery");
const app = express_1.default();
exports.app = app;
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use(express_1.default.static("./views"));
app.get('/', (req, res) => {
    res.sendStatus(200);
});
app.use("/osc", osc_1.oscRouter);
app.use("/devices", devices_1.devicesRouter);
app.use("/uploads", uploads_1.uploadRouter);
app.use("/gallery", gallery_1.galleryRouter);
