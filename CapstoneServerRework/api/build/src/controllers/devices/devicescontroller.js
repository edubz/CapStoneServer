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
exports.sendRegisterForm = exports.sendDevicesView = exports.deleteDeviceListing = exports.createNewDeviceListing = exports.getAllDevices = void 0;
const path_1 = __importDefault(require("path"));
const device_1 = require("../../models/device");
const getAllDevices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allDevices = yield device_1.devices.find({});
    try {
        res.status(200).send(allDevices);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.getAllDevices = getAllDevices;
const createNewDeviceListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    yield device_1.devices.create(req.body);
    try {
        res.end();
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.createNewDeviceListing = createNewDeviceListing;
const deleteDeviceListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield device_1.devices.deleteOne(req.body);
    try {
        res.sendStatus(200);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.deleteDeviceListing = deleteDeviceListing;
const sendDevicesView = (req, res) => {
    const deviceViewPath = path_1.default.join(__dirname, "..", "..", "views", "devicesview.html");
    res.sendFile(deviceViewPath);
};
exports.sendDevicesView = sendDevicesView;
const sendRegisterForm = (req, res) => {
    const registerFormPath = path_1.default.join(__dirname, "..", "..", "views", "deviceregisterform.html");
    res.sendFile(registerFormPath);
};
exports.sendRegisterForm = sendRegisterForm;
