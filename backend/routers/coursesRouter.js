import express from "express";
import {
  getCourses,
  getCourse,
  postCourse,
  putCourse,
  deleteCourse,
} from "../controllers/coursesController.js";

const coursesRouter = express.Router();

coursesRouter.get("/", getCourses);

coursesRouter.get("/:id", getCourse);

coursesRouter.post("/", postCourse);

coursesRouter.put("/:id", putCourse);

coursesRouter.delete("/:id", deleteCourse);

export default coursesRouter;
