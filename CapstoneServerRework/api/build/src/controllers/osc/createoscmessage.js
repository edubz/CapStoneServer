"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOscMessage = void 0;
exports.createOscMessage = ((oscAddress, oscType, oscValue) => {
    var messageObj = {
        address: oscAddress,
        args: [
            {
                type: oscType,
                value: oscValue
            }
        ]
    };
    return messageObj;
});
