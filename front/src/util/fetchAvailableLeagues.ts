"use server";

import config from "@config/config";
import { SeasonInfo } from "@models/types/season-info.type";
import axios from "axios";

export const fetchAvailableLeagues = async (
  country: string
): Promise<SeasonInfo[]> => {
  const response = await axios.get<{ seasons: SeasonInfo[] }>(
    `${config.serverAddress}/seasons/${country}`
  );
  return response.data.seasons;
};
