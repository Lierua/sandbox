import express from "express";
import {
  getStudents,
  getStudent,
  postStudent,
  putStudent,
  deleteStudent,
} from "../controllers/studentsController.js";

const studentsRouter = express.Router();

studentsRouter.get("/", getStudents);

studentsRouter.get("/:id", getStudent);

studentsRouter.post("/", postStudent);

studentsRouter.put("/:id", putStudent);

studentsRouter.delete("/:id", deleteStudent);

export default studentsRouter;
