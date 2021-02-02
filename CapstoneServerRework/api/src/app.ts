const express = require("express");
const app = express();
import { Response, Request } from 'express';
import { oscRouter } from "./routes/osc";
import { devicesRouter } from "./routes/devices"

// app.set('view engine', 'html')

app.get('/', (req: Request, res: Response) => {
    res.sendStatus(200);
})

app.use("/osc", oscRouter)
app.use("/devices", devicesRouter)

app.use(express.static("./views"))

export { app };