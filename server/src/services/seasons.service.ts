import { getSeasonsList } from "../../utils/get-seasons-list.ts";

export const getSeasons = async (leagueCountry: string) => {
  return await getSeasonsList(leagueCountry);
};
