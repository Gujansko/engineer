import axios from "axios";
import csv from "csv-parser";
import { Readable } from "stream";
import { MatchData } from "../../models/types/match-data.type.ts";
import { matchCsvToData } from "./match-csv-to-data.ts";
import config from "../../config/config.ts";

export async function extractMatchDataFromUrl(
  url: string,
  fetchedFields: (keyof MatchData)[],
  includeResults: boolean,
  leagueCountry: string,
  leagueName: string,
  season: string,
  includedTeams?: string[]
): Promise<Partial<MatchData>[]> {
  try {
    const response = await axios.get(url);
    const results: Partial<MatchData>[] = [];

    const actualFields = includeResults
      ? fetchedFields
      : fetchedFields.filter((field) => !config.resultFields.includes(field));

    const actualIncludedTeams =
      includedTeams && includedTeams.length > 0
        ? includedTeams.map((team) => team.toLowerCase().trim())
        : [];

    return new Promise((resolve, reject) => {
      Readable.from(response.data)
        .pipe(csv())
        .on("data", (data) => {
          const matchData: Partial<MatchData> = {};

          actualFields.forEach((field) => {
            const csvFields = matchCsvToData[field];

            if (csvFields) {
              const value = csvFields
                .map((f) => data[f])
                .find((v) => v !== undefined);
              if (value) {
                matchData[field] = value;
              }
            }
          });
          if (actualFields.includes("leagueName")) {
            matchData.leagueName = leagueName;
          }
          if (actualFields.includes("season")) {
            matchData.season = season;
          }
          if (actualFields.includes("leagueCountry")) {
            matchData.leagueCountry = leagueCountry;
          }

          const hasAllFields = actualFields.every(
            (field) => field in matchData
          );

          if (hasAllFields) {
            if (actualIncludedTeams.length === 0) {
              results.push(matchData);
            } else if (
              actualIncludedTeams.some(
                (team) =>
                  matchData?.homeTeam?.toLowerCase().includes(team) ||
                  team.includes(matchData?.homeTeam?.toLowerCase() ?? "")
              ) ||
              actualIncludedTeams.some(
                (team) =>
                  matchData?.awayTeam?.toLowerCase().includes(team) ||
                  team.includes(matchData?.awayTeam?.toLowerCase() ?? "")
              )
            ) {
              results.push(matchData);
            }
          } else {
            console.log("Missing fields", matchData);
            actualFields.forEach((field) =>
              console.log(`${field} ${matchData[field]}`)
            );
          }
        })
        .on("end", () => {
          resolve(results);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  } catch (error) {
    throw error;
  }
}
