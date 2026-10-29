import pool from "../../db.js";

export const getAllTeachers = async () => {
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

  return result.rows;
};

export const getTeacherByID = async (id) => {
  const result = await pool.query(
    `SELECT
        s.id,
        s.teacher_name,
        h.houses
      FROM hogwarts.teachers AS s
      LEFT JOIN hogwarts.houses AS h
        ON s.house = h.id
      WHERE s.id = $1
      GROUP BY s.id, s.teacher_name, h.houses`,
    [id],
  );

  return result.rows[0] ?? null;
};

export const createTeacher = async (teacher_name, house, starting_year) => {
  const result = await pool.query(
    `INSERT INTO hogwarts.teachers
        (teacher_name, house)
       VALUES ($1, $2)
       RETURNING id, teacher_name, house`,
    [teacher_name, house, starting_year],
  );

  return result.rows[0];
};

export const updateTeacher = async (id, teacher_name, house, starting_year) => {
  const result = await pool.query(
    `UPDATE hogwarts.teachers
     SET teacher_name = $2,
         house = $3,
         starting_year = $4
     WHERE id = $1
     RETURNING id, teacher_name, house, starting_year`,
    [id, teacher_name, house, starting_year],
  );

  return result.rows[0] ?? null;
};

export const deleteTeacherFromDB = async (id) => {
  const result = await pool.query(
    `DELETE FROM hogwarts.teachers
     WHERE id = $1
     RETURNING id, teacher_name, house, starting_year`,
    [id],
  );

  return result.rows[0] ?? null;
};
