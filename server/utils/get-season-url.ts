import * as cheerio from "cheerio";
import config from "../../config/config.ts";
import { scrapeData } from "./scrape-data.ts";

export async function getSeasonUrl(
  leagueCountry: string,
  leagueName: string,
  season: string
): Promise<string> {
  const scrapedData = await scrapeData(leagueCountry);
  const $ = cheerio.load(scrapedData);

  let currentSeason: string | null = null;
  let hrefFound: string | null = null;

  $("i").each((_, element) => {
    const seasonText = $(element).text();

    if (seasonText.includes("Season")) {
      currentSeason = seasonText.split(" ")[1] ?? seasonText;
    }

    if (currentSeason === season) {
      let nextSibling = $(element).next();
      while (nextSibling.length && nextSibling[0].tagName !== "i") {
        if (nextSibling[0].tagName === "a") {
          const href = nextSibling.attr("href");
          const leagueText = nextSibling.text().trim();

          if (
            href &&
            href.endsWith(".csv") &&
            leagueText.toLowerCase() === leagueName.toLowerCase()
          ) {
            hrefFound = config.scrapeBaseUrl + href;
            return false;
          }
        }
        nextSibling = nextSibling.next();
      }
    }
  });

  if (hrefFound) {
    return hrefFound;
  }
  throw new Error(
    `Could not find the league "${leagueName}" for season "${season}" in country "${leagueCountry}".`
  );
}
