"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWebSocketServer = void 0;
const server_1 = require("../../server");
const passosctowebsockets_1 = require("../passosctowebsockets");
const handleWebSocketServer = (websocketServer) => {
    server_1.webSocketServer.on("connection", passosctowebsockets_1.passOscToWebsockets);
    server_1.webSocketServer.on("error", (err) => console.log(err));
};
exports.handleWebSocketServer = handleWebSocketServer;
