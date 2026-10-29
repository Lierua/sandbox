import express from "express";
import {
  getTeachers,
  getTeacher,
  postTeacher,
  putTeacher,
  deleteTeacher,
} from "../controllers/teachersController.js";

const teachersRouter = express.Router();

teachersRouter.get("/", getTeachers);

teachersRouter.get("/:id", getTeacher);

teachersRouter.post("/", postTeacher);

teachersRouter.put("/:id", putTeacher);

teachersRouter.delete("/:id", deleteTeacher);

export default teachersRouter;
