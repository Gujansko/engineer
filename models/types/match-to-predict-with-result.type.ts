import { MatchToPredictWithId } from "./match-to-predict-with-id.type";

export type MatchToPredictWithResult = MatchToPredictWithId & {
  result: "A" | "H" | "D";
};
