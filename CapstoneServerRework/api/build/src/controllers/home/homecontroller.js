"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendHomeView = void 0;
const path_1 = __importDefault(require("path"));
const sendHomeView = (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "..", "..", "views", "homeview.html"));
};
exports.sendHomeView = sendHomeView;
