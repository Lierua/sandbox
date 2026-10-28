import express from "express";
import { getHouses } from "../controllers/housesController.js";

const housesRouter = express.Router();

housesRouter.get("/", getHouses);

export default housesRouter;
