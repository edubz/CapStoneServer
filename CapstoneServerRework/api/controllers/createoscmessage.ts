interface oscArgs {
    type: String,
    value: String
}
interface oscMessage {
    address: String,
    args: Array<oscArgs>
}

const createOscMessage = ((oscAddress: String, oscType: String, oscMessage: String) => {
    var messageObj: oscMessage = {
        address: oscAddress,
        args: [
            {
                type: oscType,
                value: oscMessage
            }
        ]
    }
    return messageObj;
})

export { createOscMessage, oscMessage };