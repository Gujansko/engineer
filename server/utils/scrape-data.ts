import axios from "axios";
import config from "../../config/config.ts";

export async function scrapeData(leagueCountry: string): Promise<any> {
  const scrapeUrl = config.countryScrapeUrls.find(
    (league) => league.name === leagueCountry
  )?.url;
  if (!scrapeUrl) {
    throw new Error(
      `Failed to find league URL for ${leagueCountry}, check configuration -> leaguesScrapeUrls`
    );
  }
  const { data } = await axios.get(scrapeUrl);
  return data;
}
