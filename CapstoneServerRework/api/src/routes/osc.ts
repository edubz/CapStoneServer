import express from "express";
import { sendOscView } from "../controllers/osc/oscroutecontroller"
const oscRouter = express.Router();

oscRouter.get("/", sendOscView)

export { oscRouter };