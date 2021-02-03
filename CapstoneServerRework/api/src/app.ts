import express from "express";
import { Response, Request } from 'express';
import { oscRouter } from "./routes/osc";
import { devicesRouter } from "./routes/devices"

const app = express();

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.sendStatus(200);
})

app.use("/osc", oscRouter)
app.use("/devices", devicesRouter)

app.use(express.static("./views"))

export { app };