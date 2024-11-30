import { MatchToPredict } from "./match-to-predict.type";

export type MatchToPredictWithId = MatchToPredict & {
  id: string;
};

export const matchToPredictWithIdKeys: Array<keyof MatchToPredictWithId> = [
  "leagueCountry",
  "leagueName",
  "season",
  "homeTeam",
  "awayTeam",
  "id",
] as const;
