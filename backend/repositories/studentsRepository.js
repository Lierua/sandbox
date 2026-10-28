import pool from "../../db.js";

// GET all students
export const getAllStudents = async () => {
  const result = await pool.query(`
    SELECT
      s.id,
      s.student_name,
      h.houses,
      s.starting_year,
      COALESCE(
        json_agg(c.course) FILTER (WHERE c.id IS NOT NULL),
        '[]'::json
      ) AS courses
    FROM hogwarts.students AS s
    LEFT JOIN hogwarts.houses AS h
      ON s.house = h.id
    LEFT JOIN hogwarts.course_student_ft AS cs
      ON s.id = cs.student_fk
    LEFT JOIN hogwarts.courses AS c
      ON cs.course_fk = c.id
    GROUP BY s.id, s.student_name, h.houses, s.starting_year
  `);

  return result.rows;
};

// GET one student by ID
export const getStudentByID = async (id) => {
  const result = await pool.query(
    `
      SELECT
        s.id,
        s.student_name,
        h.houses,
        s.starting_year,
        COALESCE(
          json_agg(c.course) FILTER (WHERE c.id IS NOT NULL),
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
      GROUP BY s.id, s.student_name, h.houses, s.starting_year
    `,
    [id],
  );

  return result.rows[0] ?? null;
};

// POST a new student
export const createStudent = async (student_name, house, starting_year) => {
  const result = await pool.query(
    `
      INSERT INTO hogwarts.students
        (student_name, house, starting_year)
      VALUES ($1, $2, $3)
      RETURNING id, student_name, house, starting_year
    `,
    [student_name, house, starting_year],
  );

  return result.rows[0];
};
