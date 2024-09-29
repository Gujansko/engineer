import config from "../../../config/config.ts";

export const getCountries = async (): Promise<string[]> => {
  return config.countryScrapeUrls.map((country) => country.name);
};
