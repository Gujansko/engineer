import { ActualPredictResult } from "../types/actual-predict-result.type";

export type PredictResponseBody =
  | { results: ActualPredictResult[] }
  | { error: string };
