import { getSeasonUrl } from "../../utils/get-season-url.ts";
import { extractMatchDataFromUrl } from "../../utils/extract-match-data-from-url.ts";
import { MatchData } from "@models/types/match-data.type";
import { MatchesRequestBody } from "@models/requests/matches-request-body.type";
import config from "../../../config/config.ts";

export const getMatches = async (
  body: MatchesRequestBody,
  includeResults: boolean
): Promise<Partial<MatchData>[]> => {
  const response: Partial<MatchData>[] = [];
  for (const matchRequest of body) {
    if (
      !matchRequest.leagueCountry ||
      !matchRequest.leagueName ||
      !matchRequest.seasons ||
      !matchRequest.seasons.length
    ) {
      throw new Error("Invalid request body");
    }

    const { leagueCountry, leagueName, seasons, fetchedFields, includedTeams } =
      matchRequest;

    for (const season of seasons) {
      const actualSeason = season.replace(/[^0-9/]/g, "").trim();
      const seasonsCheck = actualSeason.split("/");

      if (
        seasonsCheck.length !== 2 ||
        !seasonsCheck.every((s) => s.length === 4)
      ) {
        throw new Error("Invalid season format");
      }

      const seasonUrl = await getSeasonUrl(
        leagueCountry,
        leagueName,
        actualSeason
      );
      const matchDataUnified = await extractMatchDataFromUrl(
        seasonUrl,
        fetchedFields && fetchedFields.length > 0
          ? fetchedFields
          : config.fetchedFields,
        includeResults,
        leagueCountry,
        leagueName,
        actualSeason,
        includedTeams
      );
      response.push(...matchDataUnified);
    }
  }

  return response;
};
