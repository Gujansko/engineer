/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import axios from "axios";
import config from "@config/config";
import { MatchesRequestBody } from "../../../models/requests/matches-request-body.type";
import { MatchesRequestQuery } from "../../../models/requests/matches-request-query.type";
import { ReadonlyURLSearchParams } from "next/navigation";
import { MatchData } from "@models/types/match-data.type";

const getSearchParamsObject = (searchParams: ReadonlyURLSearchParams) => {
  const params: { [key: string]: string } = {};

  for (const [_key, value] of searchParams.entries()) {
    params[value[0]] = value[1];
  }

  return params;
};

const fetchMatches = async (
  searchParams: ReadonlyURLSearchParams,
  matchesRequestBody: MatchesRequestBody
): Promise<{ matches: Partial<MatchData>[]; requestBody: object } | string> => {
  try {
    const params = getSearchParamsObject(searchParams);

    const query: MatchesRequestQuery = {
      includeResults: params.includeResults || "true",
    };

    const response = await axios.post<{ matches: Partial<MatchData>[] }>(
      `${config.serverAddress}/matches?includeResults=${query.includeResults}`,
      matchesRequestBody
    );
    return { matches: response.data.matches, requestBody: matchesRequestBody };
  } catch (error: any) {
    return error?.response?.data?.error ?? error.message;
  }
};

export default fetchMatches;
