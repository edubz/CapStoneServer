"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseOscMessagetoArray = void 0;
let allAddresses = new Set();
let uniqueAddressesArray = new Array();
const parseOscMessagetoArray = (message) => {
    if (!allAddresses.has(message.address)) {
        allAddresses.add(message.address);
        uniqueAddressesArray.push(message);
    }
    uniqueAddressesArray.forEach((uniqueMessage) => {
        if (uniqueMessage.address == message.address && uniqueMessage.args[0].value != message.args[0].value) {
            uniqueMessage.args[0].value = message.args[0].value;
        }
    });
    return uniqueAddressesArray;
};
exports.parseOscMessagetoArray = parseOscMessagetoArray;
