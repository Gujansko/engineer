"use server";

import { MatchToPredictWithId } from "@models/types/match-to-predict-with-id.type";
import { PredictResponseBody } from "@models/responses/predict-response-body.type";
import { PredictRequestBody } from "@models/requests/predict-request-body.type";
import config from "@config/config";
import axios from "axios";

export const predict = async (
  matchesToPredictWithIds: MatchToPredictWithId[],
  predictions: Record<string, "A" | "H" | "D">
): Promise<{ response: PredictResponseBody; body: object }> => {
  const body: PredictRequestBody = matchesToPredictWithIds.map((match) => ({
    ...match,
    result: predictions[match.id],
  }));

  const response = await axios.post<PredictResponseBody>(
    `${config.serverAddress}/predict`,
    body
  );

  return { response: response.data, body };
};
