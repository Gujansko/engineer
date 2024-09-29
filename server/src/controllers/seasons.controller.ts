import { Request, Response } from "express";
import { getSeasons } from "../services/seasons.service.ts";
import { SeasonsRequestQuery } from "@models/requests/seasons-request-query.type.ts";
import { SeasonsResponseBody } from "@models/responses/seasons-response-body.type.ts";

export const getSeasonsController = async (
  req: Request<SeasonsRequestQuery>,
  res: Response<SeasonsResponseBody>
) => {
  try {
    const { leagueCountry } = req.params;
    if (!leagueCountry) {
      return res.status(400).json({ error: "League country is required" });
    }

    const seasons = await getSeasons(leagueCountry);
    res.json({ seasons });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
