import pool from "../../db.js";

export const getAllHouses = async () => {
  const result = await pool.query("SELECT * FROM hogwarts.houses");

  return result.rows;
};

export const getHousesByID = async (id) => {
  const result = await pool.query(
    `SELECT *
     FROM hogwarts.houses
     WHERE id = $1`,
    [id],
  );

  return result.rows[0] ?? null;
};
