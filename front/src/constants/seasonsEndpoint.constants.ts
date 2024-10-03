import { SeasonsResponseBody } from "../../../models/responses/seasons-response-body.type";

export const seasonsSchemaResponse: SeasonsResponseBody = {
  seasons: [
    {
      season: "string",
      leagues: [
        {
          name: "string",
          href: "string",
        },
        {
          name: "string",
          href: "string",
        },
        {
          name: "string",
          href: "string",
        },
      ],
    },
  ],
};

export const seasonsExampleResponse: SeasonsResponseBody = {
  seasons: [
    {
      season: "2024/2025",
      leagues: [
        {
          name: "Premier League",
          href: "https://www.football-data.co.uk/mmz4281/2425/E0.csv",
        },
        {
          name: "Championship",
          href: "https://www.football-data.co.uk/mmz4281/2425/E1.csv",
        },
        {
          name: "League 1",
          href: "https://www.football-data.co.uk/mmz4281/2425/E2.csv",
        },
        {
          name: "League 2",
          href: "https://www.football-data.co.uk/mmz4281/2425/E3.csv",
        },
        {
          name: "Conference",
          href: "https://www.football-data.co.uk/mmz4281/2425/EC.csv",
        },
      ],
    },
  ],
};
