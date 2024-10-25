import { MatchData } from "../types/match-data.type";

export type MatchesRequestBody = {
  leaguesCountry: string;
  leagues: { name: string; seasons: string[] }[];
  fetchedFields?: (keyof MatchData)[];
  includedTeams?: string[];
}[];
