"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passOscToWebsockets = void 0;
const udphostport_1 = require("../models/udphostport");
const server_1 = require("../server");
const parsemessages_1 = require("./osc/parsemessages");
const passOscToWebsockets = () => {
    udphostport_1.udpHostPort.on("message", (message) => {
        const messageArray = parsemessages_1.parseOscMessagetoArray(message);
        server_1.webSocketServer.emit("osc message", messageArray);
	//console.log(message);
	if (message.address == "/buddy_flag") {
		udphostport_1.udpHostPort.send({
			address: "/buddy_broadcast",
			args: [{
				type: "i",
				value: 1
				}]
		})
	}
    });
    udphostport_1.udpHostPort.on("message", (message) => {
	//console.log("message");
        udphostport_1.udpHostPort.send({ address: "/buddy_broadcast", args: [{ type: "i", value: 1 }] });
    });
};
exports.passOscToWebsockets = passOscToWebsockets;
