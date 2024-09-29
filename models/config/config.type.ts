import { MatchData } from "@models/types/match-data.type";
import { LeagueConfig } from "./league-config.type";

export type Config = {
  serverPort: number;
  serverAddress: string;
  countryScrapeUrls: LeagueConfig[];
  scrapeBaseUrl: string;
  cacheDurationSeconds: number;
  fetchedFields: (keyof MatchData)[];
  resultFields: (keyof MatchData)[];
  predictFields: (keyof MatchData)[];
};
