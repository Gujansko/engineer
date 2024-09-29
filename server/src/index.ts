import express from "express";
import cors from "cors";
import config from "../../config/config.ts";
import { getSeasonsController } from "./controllers/seasons.controller.ts";
import { getMatchesController } from "./controllers/matches.controller.ts";
import { predictController } from "./controllers/predict.controller.ts";
import cachedMiddleware from "../utils/cache.ts";
import { getCountriesController } from "./controllers/countries.controller.ts";

const app = express();
const port = config.serverPort;

app.use(cors());
app.use(express.json());

app.get("/seasons/:leagueCountry", cachedMiddleware(), getSeasonsController);

app.get("/countries", cachedMiddleware(), getCountriesController);

app.post("/predict", cachedMiddleware(), predictController);

app.post("/matches", cachedMiddleware(), getMatchesController);

app.all("*", (_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
