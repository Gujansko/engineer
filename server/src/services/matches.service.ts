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
    for (const league of matchRequest.leagues) {
      if (!league.name || !league.seasons || !league.seasons.length) {
        throw new Error("Invalid request body");
      }

      for (const season of league.seasons) {
        const actualSeason = season.replace(/[^0-9/]/g, "").trim();
        const seasonsCheck = actualSeason.split("/");

        if (
          seasonsCheck.length !== 2 ||
          !seasonsCheck.every((s) => s.length === 4)
        ) {
          throw new Error("Invalid season format");
        }

        const seasonUrl = await getSeasonUrl(
          matchRequest.leaguesCountry,
          league.name,
          actualSeason
        );
        const matchDataUnified = await extractMatchDataFromUrl(
          seasonUrl,
          matchRequest.fetchedFields && matchRequest.fetchedFields.length > 0
            ? matchRequest.fetchedFields
            : config.fetchedFields,
          includeResults,
          matchRequest.leaguesCountry,
          league.name,
          actualSeason,
          matchRequest.includedTeams
        );
        response.push(...matchDataUnified);
      }
    }
  }

  return response;
};
