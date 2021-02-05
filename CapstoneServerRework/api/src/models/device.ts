import { Mongoose } from "mongoose";
import { database } from "./mongoclient";

const deviceSchema = new database.Schema({
    name: {
        type: String,
    },
    id: {
        type: String,
        required: true
    },
    lastactive: {
        type: String
    }
})

const devices = database.model("Device", deviceSchema)
export { devices }