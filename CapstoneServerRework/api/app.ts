const express = require("express");
import { Response, Request } from 'express';
const app = express();
const router = express.Router();
import { oscRoute } from "./routes/osc"

app.get('/', (req: Request, res: Response) => {
    res.sendStatus(200);
})

app.get("/osc", oscRoute)

export { express, app, router };