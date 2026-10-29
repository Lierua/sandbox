import {
  getAllHouses,
  getHousesByID,
} from "../repositories/housesRepository.js";

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

export const getHouse = async (req, res) => {
  try {
    const house = await getHousesByID(req.params.id);

    if (!house) {
      return res.status(404).json({
        error: "House not found",
      });
    }

    res.status(200).json(house);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Database error",
      code: err.code,
    });
  }
};
