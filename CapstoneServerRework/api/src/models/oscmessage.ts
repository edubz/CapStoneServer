interface oscArgs {
    type: String,
    value: String | Number;
}

export interface oscMessage {
    address: String,
    args: Array<oscArgs>
}
