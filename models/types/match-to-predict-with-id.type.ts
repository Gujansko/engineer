import { MatchToPredict } from "./match-to-predict.type";

export type MatchToPredictWithId = MatchToPredict & {
  id: string;
};
