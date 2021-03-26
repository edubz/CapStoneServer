"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeRouter = void 0;
const express_1 = __importDefault(require("express"));
const homecontroller_1 = require("../controllers/home/homecontroller");
const homeRouter = express_1.default.Router();
exports.homeRouter = homeRouter;
homeRouter.get("/", homecontroller_1.sendHomeView);
