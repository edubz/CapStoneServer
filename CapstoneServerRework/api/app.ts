const express = require("express");
import { Response, Request } from 'express';
const app = express();
import { oscRouter } from "./routes/osc";

app.get('/', (req: Request, res: Response) => {
    res.sendStatus(200);
})

app.use("/osc", oscRouter)

export { app };