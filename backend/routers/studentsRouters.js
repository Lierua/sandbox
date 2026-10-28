import express from "express";
import {
  getStudents,
  getStudent,
  postStudent,
} from "../controllers/studentsController.js";

const studentsRouter = express.Router();

// GET all students
studentsRouter.get("/", getStudents);

// GET one student by ID
studentsRouter.get("/:id", getStudent);

// POST a new student
studentsRouter.post("/", postStudent);

export default studentsRouter;
