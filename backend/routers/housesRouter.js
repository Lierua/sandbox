import { getHouses } from "./controllers/housesController.js";

app.get("/houses", async (req, res) => {
  getHouses();
});
