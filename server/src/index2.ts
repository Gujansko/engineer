import express, { Request, Response } from "express";
import cors from "cors";
import config from "../../config/config.ts";
import { SeasonsRequestQuery } from "@models/requests/seasons-request-query.type.ts";
import cachedMiddleware from "../utils/cache.ts";
import { MatchData } from "@models/types/match-data.type.ts";
import { getSeasonsList } from "../utils/get-seasons-list.ts";
import { extractMatchDataFromUrl } from "../utils/extract-match-data-from-url.ts";
import { extractMatchDataPredictFromUrl } from "../utils/extract-match-data-predict-from-url.ts";
import { SeasonsResponseBody } from "@models/responses/seasons-response-body.type.ts";
import { MatchesRequestBody } from "@models/requests/matches-request-body.type.ts";
import { MatchesRequestQuery } from "@models/requests/matches-request-query.type.ts";
import { PredictRequestBody } from "@models/requests/predict-request-body.type.ts";
import { getSeasonUrl } from "../utils/get-season-url.ts";
import { PredictResponseBody } from "@models/responses/predict-response-body.type.ts";
import { MatchesResponseBody } from "@models/responses/matches-response-body.type.ts";

const app = express();
const port = config.serverPort;

app.use(cors());
app.use(express.json());

app.get(
  "/seasons/:leagueCountry",
  cachedMiddleware(),
  async (
    req: Request<SeasonsRequestQuery>,
    res: Response<SeasonsResponseBody>
  ) => {
    try {
      if (!req.params.leagueCountry) {
        throw new Error("League country is required query parameter");
      }
      const leagueCountry = req.params.leagueCountry;

      res.json({ seasons: await getSeasonsList(leagueCountry) });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

app.get(
  "/countries",
  cachedMiddleware(),
  async (
    _req: any,
    res: Response<{ countries: string[] } | { error: string }>
  ) => {
    try {
      res.json({
        countries: config.countryScrapeUrls.map((country) => country.name),
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

app.post(
  "/predict",
  cachedMiddleware(),
  async (
    req: Request<any, any, PredictRequestBody>,
    res: Response<PredictResponseBody>
  ) => {
    try {
      if (!Array.isArray(req.body)) {
        return res.status(400).json({ error: "Request body must be an array" });
      }
      const groupedRequestPredictions: Record<
        string,
        {
          id: string;
          leagueCountry: string;
          leagueName: string;
          season: string;
          homeTeam: string;
          awayTeam: string;
          predictedResult: "A" | "H" | "D";
        }[]
      > = {};

      req.body.forEach((prediction) => {
        if (
          !prediction.leagueCountry.length ||
          !prediction.leagueName.length ||
          !prediction.season.length ||
          !prediction.homeTeam.length ||
          !prediction.awayTeam.length ||
          !prediction.result.length ||
          !prediction.id.length
        ) {
          return res.status(400).json({ error: "Invalid request body" });
        }
        const key = `${prediction.leagueCountry}-key-${prediction.leagueName}-key-${prediction.season}`;
        if (!groupedRequestPredictions[key]) {
          groupedRequestPredictions[key] = [];
        }
        groupedRequestPredictions[key].push({
          id: prediction.id,
          leagueCountry: prediction.leagueCountry,
          leagueName: prediction.leagueName,
          season: prediction.season,
          homeTeam: prediction.homeTeam,
          awayTeam: prediction.awayTeam,
          predictedResult: prediction.result,
        });
      });

      const predictions: PredictResponseBody = { results: [] };
      for (const key in groupedRequestPredictions) {
        const predictionsGroup = groupedRequestPredictions[key];

        const seasonUrl = await getSeasonUrl(
          predictionsGroup[0].leagueCountry,
          predictionsGroup[0].leagueName,
          predictionsGroup[0].season
        );

        const teamPairs = new Map<
          string,
          {
            id: string;
            homeTeam: string;
            awayTeam: string;
            predictedResult: "A" | "H" | "D";
          }
        >();
        predictionsGroup.forEach((prediction) => {
          const key = `${prediction.leagueName}-${prediction.season}-${prediction.homeTeam}-${prediction.awayTeam}`;
          teamPairs.set(key, {
            id: prediction.id,
            homeTeam: prediction.homeTeam,
            awayTeam: prediction.awayTeam,
            predictedResult: prediction.predictedResult,
          });
        });

        const resultsForGroup = await extractMatchDataPredictFromUrl(
          seasonUrl,
          predictionsGroup[0].leagueCountry,
          predictionsGroup[0].leagueName,
          predictionsGroup[0].season,
          teamPairs,
          (leagueName, season, homeTeam, awayTeam) =>
            `${leagueName}-${season}-${homeTeam}-${awayTeam}`
        );
        predictions.results.push(...resultsForGroup);
      }

      return res.json(predictions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

app.post(
  "/matches",
  cachedMiddleware(),
  async (
    req: Request<any, any, MatchesRequestBody, MatchesRequestQuery>,
    res: Response<MatchesResponseBody>
  ) => {
    try {
      if (!Array.isArray(req.body)) {
        return res.status(400).json({ error: "Request body must be an array" });
      } else if (!req.query.includeResults) {
        return res
          .status(400)
          .json({ error: "Query parameter includeResults is required" });
      }

      const response: Partial<MatchData>[] = [];

      for (const body of req.body) {
        if (
          !body.leagueCountry ||
          !body.leagueName ||
          !body.seasons ||
          !body.seasons.length
        ) {
          return res.status(400).json({ error: "Invalid request body" });
        }

        const {
          leagueCountry,
          leagueName,
          seasons,
          fetchedFields,
          includedTeams,
        } = body;

        for (const season of seasons) {
          const seasons = season.split("/");
          if (seasons.length !== 2 || !seasons.every((s) => s.length === 4)) {
            return res.status(400).json({ error: "Invalid season format" });
          }

          try {
            const seasonUrl = await getSeasonUrl(
              leagueCountry,
              leagueName,
              season
            );
            const matchDataUnified = await extractMatchDataFromUrl(
              seasonUrl,
              fetchedFields && fetchedFields.length > 0
                ? fetchedFields
                : config.fetchedFields,
              req.query.includeResults === "true",
              leagueCountry,
              leagueName,
              season,
              includedTeams
            );
            response.push(...matchDataUnified);
          } catch (innerError: any) {
            return res.status(500).json({ error: innerError.message });
          }
        }
      }

      res.json({ matches: response });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

app.all("*", (_req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

