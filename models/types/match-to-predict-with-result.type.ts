import { MatchToPredict } from "./match-to-predict.type";

export type MatchToPredictWithResult = MatchToPredict & {
  result: "A" | "H" | "D";
};
