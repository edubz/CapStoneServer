const express = require("express");
import { Response, Request } from 'express';
const app = express();
import { oscRouter } from "./routes/osc";

app.set('view engine', 'html')

app.get('/', (req: Request, res: Response) => {
    res.sendStatus(200);
})

app.use("/osc", oscRouter)

app.use(express.static("./views"))

export { app };