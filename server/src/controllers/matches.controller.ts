import { Request, Response } from "express";
import { getMatches } from "../services/matches.service.ts";
import { MatchesRequestBody } from "@models/requests/matches-request-body.type.ts";
import { MatchesRequestQuery } from "@models/requests/matches-request-query.type.ts";
import { MatchesResponseBody } from "@models/responses/matches-response-body.type.ts";

export const getMatchesController = async (
  req: Request<any, any, MatchesRequestBody, MatchesRequestQuery>,
  res: Response<MatchesResponseBody>
) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: "Request body must be an array" });
    }
    if (
      req.body.some(
        (element) => !Array.isArray(element.leagues) || !element.leagues.length
      )
    ) {
      return res
        .status(400)
        .json({ error: "Request body leagues must be an array" });
    }
    if (
      req.body.some(
        (element) => !element.leagues.every((league) => league.seasons.length)
      )
    ) {
      return res
        .status(400)
        .json({
          error: "Request body leagues seasons must be an nonempty array",
        });
    }
    if (!req.query.includeResults) {
      return res
        .status(400)
        .json({ error: "Query parameter includeResults is required" });
    }

    const matches = await getMatches(
      req.body,
      req.query.includeResults === "true"
    );
    res.json({ matches });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
