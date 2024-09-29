import { Config } from "../models/config/config.type";

if (process.env.NODE_ENV !== "production") {
  const dotenv = await import("dotenv");
  dotenv.config({ path: "../.env" });
}

const serverPort = process.env.SERVER_PORT || "3001";
const scrapeBaseUrl =
  process.env.SCRAPE_BASE_URL ?? "https://www.football-data.co.uk/";
const serverAddress =
  process.env.SERVER_ADDRESS ?? `http://localhost:${serverPort}`;
const cacheDurationSeconds = process.env.CACHE_DURATION_SECONDS ?? "1800";

const config: Config = {
  serverPort: parseInt(serverPort),
  serverAddress: serverAddress,
  scrapeBaseUrl: scrapeBaseUrl,
  cacheDurationSeconds: parseInt(cacheDurationSeconds),
  fetchedFields: [
    "leagueDivision",
    "leagueCountry",
    "leagueName",
    "season",
    "matchDate",
    "matchTime",
    "homeTeam",
    "awayTeam",
    "fullTimeHomeGoals",
    "fullTimeAwayGoals",
    "fullTimeResult",
    "halfTimeHomeGoals",
    "halfTimeAwayGoals",
    "halfTimeResult",
    "avgHomeWinOdds",
    "avgDrawOdds",
    "avgAwayWinOdds",
  ],
  resultFields: [
    "fullTimeHomeGoals",
    "fullTimeAwayGoals",
    "fullTimeResult",
    "halfTimeHomeGoals",
    "halfTimeAwayGoals",
    "halfTimeResult",
  ],
  predictFields: [
    "leagueCountry",
    "leagueName",
    "season",
    "homeTeam",
    "awayTeam",
    "fullTimeResult",
  ],
  countryScrapeUrls: [
    { name: "England", url: `${scrapeBaseUrl}englandm.php` },
    { name: "Scotland", url: `${scrapeBaseUrl}scotlandm.php` },
    { name: "Germany", url: `${scrapeBaseUrl}germanym.php` },
  ],
};

export default config;
