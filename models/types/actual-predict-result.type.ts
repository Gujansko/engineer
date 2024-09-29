import { MatchToPredictWithResult } from "./match-to-predict-with-result.type";

export type ActualPredictResult = MatchToPredictWithResult & {
  actualResult: "H" | "D" | "A";
};
