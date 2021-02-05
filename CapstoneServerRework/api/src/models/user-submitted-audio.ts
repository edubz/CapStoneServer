import { database } from "./mongoclient"
const gridSchema = new database.Schema({}, { strict: false });
const userFiles = database.model("UserFile", gridSchema, "fsuser.files");
const userChunks = database.model("UserChunk", gridSchema, "fsuser.chunks");

export { userFiles, userChunks };