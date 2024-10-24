"use server";

import { PredictResponseBody } from "@models/responses/predict-response-body.type";
import { PredictRequestBody } from "@models/requests/predict-request-body.type";
import config from "@config/config";
import axios from "axios";
import { createPredictionId } from "./createPredictionId";
import { MatchToPredict } from "@models/types/match-to-predict.type";

export const predict = async (
  matchesToPredict: MatchToPredict[],
  predictions: Record<string, "A" | "H" | "D">
): Promise<{ response: PredictResponseBody; body: object }> => {
  const body: PredictRequestBody = matchesToPredict.map((match) => ({
    leagueCountry: match.leagueCountry,
    leagueName: match.leagueName,
    season: match.season,
    homeTeam: match.homeTeam,
    awayTeam: match.awayTeam,
    result: predictions[createPredictionId(match)],
  }));

  const response = await axios.post<PredictResponseBody>(
    `${config.serverAddress}/predict`,
    body
  );

  return { response: response.data, body };
};
