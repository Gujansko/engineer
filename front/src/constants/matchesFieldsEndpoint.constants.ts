import { MatchData } from "@models/types/match-data.type";

export const matchesFieldsSchemaResponse: { fields: string[] } = {
  fields: ["string", "string", "string"],
};

export const matchesFieldsExampleResponse: { fields: (keyof MatchData)[] } = {
  fields: [
    "leagueDivision",
    "leagueCountry",
    "leagueName",
    "season",
    "matchDate",
    "matchTime",
    "homeTeam",
    "awayTeam",
    "fullTimeHomeGoals",
    "fullTimeAwayGoals",
    "fullTimeResult",
    "halfTimeHomeGoals",
    "halfTimeAwayGoals",
    "halfTimeResult",
    "avgHomeWinOdds",
    "avgDrawOdds",
    "avgAwayWinOdds",
  ],
};
