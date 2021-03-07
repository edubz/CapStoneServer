"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devices = void 0;
const mongoclient_1 = require("./mongoclient");
const deviceSchema = new mongoclient_1.database.Schema({
    name: {
        type: String,
    },
    id: {
        type: String,
        required: true
    }
});
const devices = mongoclient_1.database.model("Device", deviceSchema);
exports.devices = devices;
