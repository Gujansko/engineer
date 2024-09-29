import { Request, Response } from "express";
import { getCountries } from "../services/countries.service.ts";

export const getCountriesController = async (
  _req: Request,
  res: Response<{ countries: string[] } | { error: string }>
) => {
  try {
    const countries = await getCountries();
    res.json({ countries });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
