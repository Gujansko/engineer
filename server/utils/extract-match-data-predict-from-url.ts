import axios from "axios";
import csv from "csv-parser";
import { Readable } from "stream";
import { MatchData } from "../../models/types/match-data.type";
import { matchCsvToData } from "./match-csv-to-data.ts";
import config from "../../config/config.ts";
import { ActualPredictResult } from "../../models/types/actual-predict-result.type";

export async function extractMatchDataPredictFromUrl(
  url: string,
  leagueCountry: string,
  leagueName: string,
  season: string,
  teamPairsWithPrediction: Map<
    string,
    {
      id: string;
      homeTeam: string;
      awayTeam: string;
      predictedResult: "A" | "H" | "D";
    }
  >,
  generateKey: (
    leagueName: string,
    season: string,
    homeTeam: string,
    awayTeam: string
  ) => string
): Promise<ActualPredictResult[]> {
  try {
    const response = await axios.get(url);
    const results: ActualPredictResult[] = [];

    return new Promise((resolve, reject) => {
      Readable.from(response.data)
        .pipe(csv())
        .on("data", (data) => {
          const matchData: Partial<MatchData> = {};

          config.fetchedFields.forEach((field) => {
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

          matchData.leagueName = leagueName;
          matchData.season = season;
          matchData.leagueCountry = leagueCountry;

          const key = generateKey(
            leagueName,
            season,
            matchData.homeTeam as string,
            matchData.awayTeam as string
          );

          const teamPairWithResult = teamPairsWithPrediction.get(key);

          const hasAllFieldsAndIsTheMatch =
            config.fetchedFields.every((field) => field in matchData) &&
            teamPairWithResult;

          if (hasAllFieldsAndIsTheMatch) {
            results.push({
              id: teamPairWithResult.id,
              homeTeam: teamPairWithResult.homeTeam,
              awayTeam: teamPairWithResult.awayTeam,
              leagueCountry,
              leagueName,
              season,
              result: teamPairWithResult.predictedResult,
              actualResult: matchData.fullTimeResult as "H" | "A" | "D",
            });
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
