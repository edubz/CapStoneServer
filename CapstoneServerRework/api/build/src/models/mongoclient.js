"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbIsConnected = exports.dbOptions = exports.dbURI = exports.database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.database = mongoose_1.default;
const dbURI = "mongodb+srv://capstoner:capstone2020@pcc-creative-coding-cap.3cnck.mongodb.net/pcc-capstone-2020-db?retryWrites=true&w=majority";
exports.dbURI = dbURI;
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
exports.dbOptions = dbOptions;
let dbIsConnected = new Promise((resolve) => {
    if (mongoose_1.default.connection.readyState == 1)
        resolve;
});
exports.dbIsConnected = dbIsConnected;
