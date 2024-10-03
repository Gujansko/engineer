import { PredictResponseBody } from "../../../models/responses/predict-response-body.type";
import { PredictRequestBody } from "@models/requests/predict-request-body.type";

export const predictSchemaResponse: { results: Array<object> } = {
  results: [
    {
      id: "string",
      leagueName: "string",
      leagueCountry: "string",
      season: "string",
      homeTeam: "string",
      awayTeam: "string",
      result: "A | D | H",
      actualResult: "A | D | H",
    },
  ],
};

export const predictExampleResponse: PredictResponseBody = {
  results: [
    {
      id: "1",
      leagueName: "Premier League",
      leagueCountry: "England",
      season: "2023/2024",
      homeTeam: "Burnley",
      awayTeam: "Arsenal",
      result: "H",
      actualResult: "H",
    },
    {
      id: "2",
      leagueName: "Bundesliga 1",
      leagueCountry: "Germany",
      season: "2023/2024",
      homeTeam: "Bayern Munich",
      awayTeam: "Dortmund",
      result: "D",
      actualResult: "A",
    },
  ],
};

export const predictSchemaRequest: Array<object> = [
  {
    id: "string",
    leagueName: "string",
    leagueCountry: "string",
    season: "string",
    homeTeam: "string",
    awayTeam: "string",
    result: "A | D | H",
  },
  {
    id: "string",
    leagueName: "string",
    leagueCountry: "string",
    season: "string",
    homeTeam: "string",
    awayTeam: "string",
    result: "A | D | H",
  },
];

export const predictExampleRequest: PredictRequestBody = [
  {
    id: "1",
    leagueName: "Premier League",
    leagueCountry: "England",
    season: "2023/2024",
    homeTeam: "Burnley",
    awayTeam: "Arsenal",
    result: "H",
  },
  {
    id: "2",
    leagueName: "Bundesliga 1",
    leagueCountry: "Germany",
    season: "2023/2024",
    homeTeam: "Bayern Munich",
    awayTeam: "Dortmund",
    result: "D",
  },
];
