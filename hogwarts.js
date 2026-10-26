const express = require("express");
const pool = require("./db");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parse JSON bodies   ​

app.get("/", (req, res) => {
  res.send("Hello Hogwarts!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

///////// STUDENTS BACKEND ////////////

app.get("/students", async (req, res) => {
  try {
    const result = await pool.query(`SELECT
      s.id,
      s.student_name,
      h.houses,
      COALESCE(
        json_agg(c.course)
          FILTER (WHERE c.id IS NOT NULL),
        '[]'::json
      ) AS courses
      FROM hogwarts.students AS s
      LEFT JOIN hogwarts.houses AS h
        ON s.house = h.id
      LEFT JOIN hogwarts.course_student_ft AS cs
        ON s.id = cs.student_fk
      LEFT JOIN hogwarts.courses AS c
        ON cs.course_fk = c.id
      GROUP BY s.id, s.student_name, h.houses`);
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error", code: err.code });
  }
});

app.get("/students/:id", async (req, res) => {
  try {
    const one = await pool.query(
      `SELECT
      s.id,
      s.student_name,
      h.houses,
      COALESCE(
        json_agg(c.course)
          FILTER (WHERE c.id IS NOT NULL),
        '[]'::json
      ) AS courses
      FROM hogwarts.students AS s
      LEFT JOIN hogwarts.houses AS h
        ON s.house = h.id
      LEFT JOIN hogwarts.course_student_ft AS cs
        ON s.id = cs.student_fk
      LEFT JOIN hogwarts.courses AS c
        ON cs.course_fk = c.id
      WHERE s.id = $1
      GROUP BY s.id, s.student_name, h.houses`,
      [req.params.id],
    );

    if (one.rows.length === 0) {
      return res.sendStatus(404);
    }

    res.status(200).json(one.rows);
  } catch (err) {
    console.error("GET /students/:id failed:", err.message);
    console.error("PostgreSQL error code:", err.code);

    res.status(500).json({
      error: "Database error",
      message: err.message,
    });
  }
});

app.put("/students/:id", async (req, res) => {
  const { student_name, house, starting_year } = req.body;

  try {
    const upd = await pool.query(
      `UPDATE hogwarts.students SET student_name = $1, house = $2, starting_year = $3
       WHERE id = $4
       RETURNING id, student_name, house, starting_year`,
      [student_name, house, starting_year, req.params.id],
    );
    if (upd.rowCount === 0) return res.sendStatus(404);

    res.status(200).json(upd.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    const del = await pool.query(
      "DELETE FROM hogwarts.students WHERE id = $1",
      [req.params.id],
    );
    if (del.rowCount === 0) return res.sendStatus(404);

    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/students", async (req, res) => {
  const { student_name, house, starting_year } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO hogwarts.students
        (student_name, house, starting_year)
       VALUES ($1, $2, $3)
       RETURNING id, student_name, house, starting_year`,
      [student_name, house, starting_year],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

///////// TEACHERS BACKEND ////////////

app.get("/teachers", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
    s.id,
    s.teacher_name,
    h.houses
    FROM hogwarts.teachers AS s
    LEFT JOIN hogwarts.houses AS h
        ON s.house = h.id
    GROUP BY s.id, s.teacher_name, h.houses;
      `);

    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error", code: err.code });
  }
});

app.get("/teachers/:id", async (req, res) => {
  try {
    const one = await pool.query(
      `SELECT
        s.id,
        s.teacher_name,
        h.houses
      FROM hogwarts.teachers AS s
      LEFT JOIN hogwarts.houses AS h
        ON s.house = h.id
      WHERE s.id = $1
      GROUP BY s.id, s.teacher_name, h.houses`,
      [req.params.id],
    );

    if (one.rows.length === 0) {
      return res.sendStatus(404);
    }

    res.status(200).json(one.rows[0]);
  } catch (err) {
    console.error("GET /teachers/:id failed:", err.message);
    console.error("PostgreSQL error code:", err.code);

    res.status(500).json({
      error: "Database error",
      message: err.message,
    });
  }
});

app.put("/teachers/:id", async (req, res) => {
  const { teacher_name, house } = req.body;

  try {
    const upd = await pool.query(
      `UPDATE hogwarts.teachers SET teacher_name = $1, house = $2
       WHERE id = $3
       RETURNING id, teacher_name, house`,
      [teacher_name, house, req.params.id],
    );
    if (upd.rowCount === 0) return res.sendStatus(404);

    res.status(200).json(upd.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.delete("/teachers/:id", async (req, res) => {
  try {
    const del = await pool.query(
      "DELETE FROM hogwarts.teachers WHERE id = $1",
      [req.params.id],
    );
    if (del.rowCount === 0) return res.sendStatus(404);

    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/teachers", async (req, res) => {
  const { teacher_name, house } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO hogwarts.teachers
        (teacher_name, house)
       VALUES ($1, $2)
       RETURNING id, teacher_name, house`,
      [teacher_name, house],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

///////// HOUSES BACKEND ////////////

app.get("/houses", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM hogwarts.houses");
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error", code: err.code });
  }
});

///////// COURSES BACKEND ////////////

app.get("/courses", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM hogwarts.courses");
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error", code: err.code });
  }
});
