"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.oscRouter = void 0;
const express_1 = __importDefault(require("express"));
const oscroutecontroller_1 = require("../controllers/osc/oscroutecontroller");
const oscRouter = express_1.default.Router();
exports.oscRouter = oscRouter;
oscRouter.get("/", oscroutecontroller_1.sendOscView);
