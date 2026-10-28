import { getAllHouses } from "../repositories/housesRepository.js";

export const getHouses = async (req, res) => {
  try {
    const houses = await getAllHouses();

    res.status(200).json(houses);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Database error",
      code: err.code,
    });
  }
};
