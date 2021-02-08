import express from "express";
import { sendHomeView } from "../controllers/home/homecontroller";
const homeRouter = express.Router();

homeRouter.get("/", sendHomeView);

export { homeRouter };