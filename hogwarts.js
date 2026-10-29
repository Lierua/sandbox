import express from "express";
import pool from "./db.js";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Hogwarts!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

///////// STUDENTS BACKEND ////////////
import studentsRouter from "./backend/routers/studentsRouter.js";

app.use("/students", studentsRouter);

///////// TEACHERS BACKEND ////////////
import teachersRouter from "./backend/routers/teachersRouter.js";

app.use("/teachers", teachersRouter);

///////// HOUSES BACKEND ////////////
import housesRouter from "./backend/routers/housesRouter.js";

app.use("/houses", housesRouter);

///////// COURSES BACKEND ////////////
import coursesRouter from "./backend/routers/coursesRouter.js";

app.use("/courses", coursesRouter);
