interface oscArgs {
    type: String,
    value: String
}

export interface oscMessage {
    address: String,
    args: Array<oscArgs>
}
