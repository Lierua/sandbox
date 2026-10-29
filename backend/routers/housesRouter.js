import express from "express";
import { getHouse, getHouses } from "../controllers/housesController.js";

const housesRouter = express.Router();

housesRouter.get("/", getHouses);
housesRouter.get("/:id", getHouse);

export default housesRouter;
