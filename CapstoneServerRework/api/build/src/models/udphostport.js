"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.udpHostPort = void 0;
const createudpport_1 = require("../controllers/osc/createudpport");
exports.udpHostPort = createudpport_1.createUdpPort("0.0.0.0", 57121);
