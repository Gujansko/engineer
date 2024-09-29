import { MatchData } from "../types/match-data.type";

export type MatchesRequestBody = {
  leagueCountry: string;
  leagueName: string;
  seasons: string[];
  fetchedFields?: (keyof MatchData)[];
  includedTeams?: string[];
}[];
