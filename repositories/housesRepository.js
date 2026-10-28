import pool from "../db.js";

export const getAllHouses = async () => {
  const result = await pool.query("SELECT * FROM hogwarts.houses");
  return result.rows;
};
