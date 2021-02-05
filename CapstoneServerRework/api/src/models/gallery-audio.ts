import { database } from "./mongoclient"
const gridSchema = new database.Schema({}, { strict: false });
const galleryFiles = database.model("GalleryFile", gridSchema, "fsgallery.files");
const galleryChunks = database.model("GalleryChunk", gridSchema, "fsgallery.chunks");

export { galleryFiles, galleryChunks };