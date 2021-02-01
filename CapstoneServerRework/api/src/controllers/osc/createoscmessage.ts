import { oscMessage } from "../../models/oscmessage";
export const createOscMessage = ((oscAddress: String, oscType: String, oscValue: String) => {
    var messageObj: oscMessage = {
        address: oscAddress,
        args: [
            {
                type: oscType,
                value: oscValue
            }
        ]
    }
    return messageObj;
})