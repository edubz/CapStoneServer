import express from "express";
import bodyParser from "body-parser";

import { oscRouter } from "./routes/osc";
import { devicesRouter } from "./routes/devices";
import { uploadRouter } from "./routes/uploads";
import { galleryRouter } from "./routes/gallery";
import { sendHomeView } from "./controllers/home/homecontroller";
import cors from "cors";
const corsOptions = {
    origin: 'http://localhost:3000' && 'http://theinput.tk',
    optionsSuccessStatus: 200
}

const app = express();

app.use(express.json());

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("./views"))

app.get("/", sendHomeView)

app.use("/osc", oscRouter)
app.use("/devices", devicesRouter)
app.use("/uploads", uploadRouter)
app.use("/gallery", galleryRouter)


export { app };