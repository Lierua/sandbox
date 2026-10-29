import pool from "../../db.js";

export const getAllCourses = async () => {
  const result = await pool.query(`
    SELECT
      s.id,
      s.course,
      h.teacher_name
    FROM hogwarts.courses AS s
    LEFT JOIN hogwarts.teachers AS h
      ON s.teacher = h.id
  `);

  return result.rows;
};

export const getCourseByID = async (id) => {
  const result = await pool.query(
    `SELECT
      s.id,
      s.course,
      h.teacher_name
    FROM hogwarts.courses AS s
    LEFT JOIN hogwarts.teachers AS h
      ON s.teacher = h.id
    WHERE s.id = $1
    `,
    [id],
  );

  return result.rows[0] ?? null;
};

export const createCourse = async (course, teacher) => {
  const result = await pool.query(
    `
      INSERT INTO hogwarts.courses
        (course, teacher)
      VALUES ($1, $2, $3)
      RETURNING id, course, teacher
    `,
    [course, teacher],
  );

  return result.rows[0];
};

export const updateCourse = async (id, course, teacherr) => {
  const result = await pool.query(
    `UPDATE hogwarts.courses
     SET course = $2,
         teacher = $3
     WHERE id = $1
     RETURNING id, course, teacher`,
    [id, course, teacher],
  );

  return result.rows[0] ?? null;
};

export const deleteCourseFromDB = async (id) => {
  const result = await pool.query(
    `DELETE FROM hogwarts.courses
     WHERE id = $1
     RETURNING id, course, teacher`,
    [id],
  );

  return result.rows[0] ?? null;
};
