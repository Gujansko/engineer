import { getSeasonUrl } from "../../utils/get-season-url.ts";
import { extractMatchDataPredictFromUrl } from "../../utils/extract-match-data-predict-from-url.ts";
import { PredictRequestBody } from "@models/requests/predict-request-body.type";
import { PredictResponseBody } from "@models/responses/predict-response-body.type";

export const getPredictions = async (
  predictions: PredictRequestBody
): Promise<PredictResponseBody> => {
  const groupedRequestPredictions: Record<
    string,
    {
      leagueCountry: string;
      leagueName: string;
      season: string;
      homeTeam: string;
      awayTeam: string;
      predictedResult: "A" | "H" | "D";
    }[]
  > = {};
  predictions.forEach((prediction) => {
    if (
      !prediction.leagueCountry.length ||
      !prediction.leagueName.length ||
      !prediction.season.length ||
      !prediction.homeTeam.length ||
      !prediction.awayTeam.length ||
      !prediction.result.length
    ) {
      throw new Error("Invalid request body");
    }

    const key = `${prediction.leagueCountry}-key-${prediction.leagueName}-key-${prediction.season}`;
    if (!groupedRequestPredictions[key]) {
      groupedRequestPredictions[key] = [];
    }
    groupedRequestPredictions[key].push({
      leagueCountry: prediction.leagueCountry,
      leagueName: prediction.leagueName,
      season: prediction.season,
      homeTeam: prediction.homeTeam,
      awayTeam: prediction.awayTeam,
      predictedResult: prediction.result,
    });
  });

  const response: PredictResponseBody = { results: [] };
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
        homeTeam: string;
        awayTeam: string;
        predictedResult: "A" | "H" | "D";
      }
    >();
    predictionsGroup.forEach((prediction) => {
      const key = `${prediction.leagueName}-${prediction.season}-${prediction.homeTeam}-${prediction.awayTeam}`;
      teamPairs.set(key, {
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

    response.results.push(...resultsForGroup);
  }

  return response;
};
