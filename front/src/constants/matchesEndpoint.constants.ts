import { MatchesResponseBody } from "../../../models/responses/matches-response-body.type";
import { MatchesRequestBody } from "@models/requests/matches-request-body.type";

export const matchesSchemaResponse: MatchesResponseBody = {
  matches: [
    {
      leagueDivision: "string",
      leagueCountry: "string",
      leagueName: "string",
      season: "string",
      matchDate: "string",
      matchTime: "string",
      homeTeam: "string",
      awayTeam: "string",
      fullTimeHomeGoals: "string",
      fullTimeAwayGoals: "string",
      fullTimeResult: "string",
    },
    {
      leagueDivision: "string",
      leagueCountry: "string",
      leagueName: "string",
      season: "string",
      homeTeam: "string",
      awayTeam: "string",
      fullTimeHomeGoals: "string",
      fullTimeAwayGoals: "string",
      fullTimeResult: "string",
    },
  ],
};

export const matchesExampleResponse: MatchesResponseBody = {
  matches: [
    {
      leagueDivision: "E0",
      leagueCountry: "England",
      leagueName: "Premier League",
      season: "2023/2024",
      matchDate: "11/08/2023",
      matchTime: "20:00",
      homeTeam: "Burnley",
      awayTeam: "Man City",
      fullTimeHomeGoals: "0",
      fullTimeAwayGoals: "3",
      fullTimeResult: "A",
    },
    {
      leagueDivision: "E0",
      leagueCountry: "England",
      leagueName: "Premier League",
      season: "2023/2024",
      matchDate: "12/08/2023",
      matchTime: "12:30",
      homeTeam: "Arsenal",
      awayTeam: "Nott'm Forest",
      fullTimeHomeGoals: "2",
      fullTimeAwayGoals: "1",
      fullTimeResult: "H",
    },
    {
      leagueDivision: "D1",
      leagueCountry: "Germany",
      leagueName: "Bundesliga 1",
      season: "2023/2024",
      homeTeam: "Werder Bremen",
      awayTeam: "Bayern Munich",
      fullTimeHomeGoals: "0",
      fullTimeAwayGoals: "4",
      fullTimeResult: "A",
    },
  ],
};

export const matchesSchemaRequest: Array<object> = [
  {
    leaguesCountry: "string",
    leagues: "{ name: string, seasons: string[] }[]",
    fetchedFields: "matchFields[] | null",
    includedTeams: "string[] | null",
  },
  {
    leaguesCountry: "string",
    leagueName: "string",
    seasons: "string[]",
    fetchedFields: "matchFields[] | null",
    includedTeams: "string[] | null",
  },
];

export const matchesExampleRequest: MatchesRequestBody = [
  {
    leaguesCountry: "England",
    leagues: [
      {
        name: "Premier League",
        seasons: ["2023/2024"],
      },
    ],
    fetchedFields: [
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
    ],
    includedTeams: ["Burnley", "Arsenal"],
  },
  {
    leaguesCountry: "Germany",
    leagues: [
      {
        name: "Bundesliga 1",
        seasons: ["2023/2024"],
      },
    ],
  },
];
