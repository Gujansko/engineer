import { SeasonInfo } from "../../models/types/season-info.type";
import * as cheerio from "cheerio";
import config from "../../config/config.ts";
import { scrapeData } from "./scrape-data.ts";

export async function getSeasonsList(
  leagueCountry: string
): Promise<SeasonInfo[]> {
  const scrapedData = await scrapeData(leagueCountry);
  const $ = cheerio.load(scrapedData);
  const seasons: SeasonInfo[] = [];
  let currentSeason: SeasonInfo | null = null;

  $("i").each((_, element) => {
    const seasonText = $(element).text();
    if (seasonText.includes("Season")) {
      if (currentSeason) {
        seasons.push(currentSeason);
      }
      currentSeason = {
        season: seasonText.split(" ")[1] ?? seasonText,
        leagues: [],
      };
    }

    let nextSibling = $(element).next();
    while (nextSibling.length && nextSibling[0].tagName !== "i") {
      if (nextSibling[0].tagName === "a") {
        const href = nextSibling.attr("href");
        if (href && href.endsWith(".csv")) {
          const leagueName = nextSibling.text();
          if (leagueName) {
            currentSeason?.leagues.push({
              name: leagueName,
              href: config.scrapeBaseUrl + href,
            });
          }
        }
      }
      nextSibling = nextSibling.next();
    }
  });

  if (currentSeason) {
    seasons.push(currentSeason);
  }
  return seasons;
}
