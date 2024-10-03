import {
  ALL_MATCH_DATA_KEYS,
  MatchData,
} from "../../../models/types/match-data.type.ts";

export const getAvailableMatchesFields = async (): Promise<
  (keyof MatchData)[]
> => {
  return ALL_MATCH_DATA_KEYS;
};
