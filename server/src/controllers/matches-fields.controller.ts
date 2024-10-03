import { Request, Response } from "express";
import { getAvailableMatchesFields } from "../services/matches-fields.service.ts";
import { MatchData } from "@models/types/match-data.type.ts";

export const getMatchesFieldsController = async (
  _req: Request,
  res: Response<{ fields: (keyof MatchData)[] } | { error: string }>
) => {
  try {
    const fields = await getAvailableMatchesFields();
    res.json({ fields });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
