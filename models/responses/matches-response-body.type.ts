import { MatchData } from "../types/match-data.type";

export type MatchesResponseBody =
  | { matches: Partial<MatchData>[] }
  | { error: string };
