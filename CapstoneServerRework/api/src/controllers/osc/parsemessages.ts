import { oscMessage } from "../../models/oscmessage";

let allAddresses = new Set();
let uniqueAddressesArray = new Array();

export const parseOscMessagetoArray = (message: oscMessage) => {
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
}