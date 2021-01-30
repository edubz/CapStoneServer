const express = require("express");
import { Response, Request } from 'express';
const app = express();
const router = express.Router();
const port = 5000;

app.use('/', (req: Request, res: Response) => {
    res.sendStatus(200);
})

if (process.env.NODE_ENV != "test") {
    app.listen(port, () => console.log(`app listening at port: ${port}`, app.listening));
}

export { express, app, router, port };