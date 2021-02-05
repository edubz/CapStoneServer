import express from "express";
import bodyParser from "body-parser";
import { Response, Request } from 'express';
import { oscRouter } from "./routes/osc";
import { devicesRouter } from "./routes/devices";
import { uploadRouter } from "./routes/uploads";
import { galleryRouter } from "./routes/gallery";

const app = express();

app.use(express.json())

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("./views"))

app.get('/', (req: Request, res: Response) => {
    res.sendStatus(200);
})

app.use("/osc", oscRouter)
app.use("/devices", devicesRouter)
app.use("/uploads", uploadRouter)
app.use("/gallery", galleryRouter)


export { app };