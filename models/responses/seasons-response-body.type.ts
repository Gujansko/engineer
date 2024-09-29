import { SeasonInfo } from "../types/season-info.type";

export type SeasonsResponseBody = { seasons: SeasonInfo[] } | { error: string };