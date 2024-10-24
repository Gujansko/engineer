"use client";

import { X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Checkbox } from "../../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Input } from "../../ui/input";
import { ALL_MATCH_DATA_KEYS, MatchData } from "@models/types/match-data.type";
import { Textarea } from "../../ui/textarea";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import config from "@config/config";
import RequiredDialogInfo from "../matchesInfoDialogs/RequiredInfoDialog";
import AvailableLeaguesDialog from "../matchesInfoDialogs/AvailableLeaguesDialog";
import OptionalDialogInfo from "../matchesInfoDialogs/OptionalInfoDialog";
import { MatchesRequestBody } from "@models/requests/matches-request-body.type";

const MatchesFetchCard = ({
  availableCountries,
  index,
  fetchCardIndices,
  setFetchCardIndices,
  matchesRequestBody,
  setMatchesRequestBody,
}: {
  availableCountries: string[];
  index: number;
  fetchCardIndices: number[];
  setFetchCardIndices: Dispatch<SetStateAction<number[]>>;
  matchesRequestBody: MatchesRequestBody;
  setMatchesRequestBody: Dispatch<SetStateAction<MatchesRequestBody>>;
}) => {
  const [country, setCountry] = useState("");
  const [league, setLeague] = useState("");
  const [seasons, setSeasons] = useState("");
  const [teams, setTeams] = useState("");
  const [statisticFields, setStatisticFields] = useState<string>(
    config.fetchedFields.join(",")
  );

  const handleCountryChange = (value: string) => {
    setCountry(value);
  };

  const handleLeagueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLeague(e.target.value);
  };

  const handleSeasonsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSeasons(e.target.value);
  };

  const handleTeamsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTeams(e.target.value);
  };

  const handleStatisticFieldChange = (field: string) => {
    const currentFields = statisticFields.split(",").filter(Boolean);
    let updatedFields;

    if (currentFields.includes(field)) {
      updatedFields = currentFields.filter((f) => f !== field);
    } else {
      updatedFields = [...currentFields, field];
    }

    const updatedFieldsString = updatedFields.filter(Boolean).join(",");

    setStatisticFields(updatedFieldsString);
  };

  const handleRemoveCard = () => {
    if (fetchCardIndices.length <= 1) {
      return;
    }

    const updatedIndices = fetchCardIndices.filter((i) => i !== index);
    setFetchCardIndices(updatedIndices);
  };

  useEffect(() => {
    const updatedRequestBody = [...matchesRequestBody];
    const newRequestBody = {
      leagueCountry: country,
      leagueName: league,
      seasons: seasons.split(","),
      fetchedFields: statisticFields.split(",") as (keyof MatchData)[],
      includedTeams: teams.split(","),
    };
    updatedRequestBody[index] = newRequestBody;

    setMatchesRequestBody(updatedRequestBody);
  }, [country, league, seasons, teams, statisticFields, index]);

  return (
    <Card className="max-w-6xl min-w-[40%]">
      <CardHeader>
        <CardTitle>Filter parameters</CardTitle>
        <CardDescription>
          Set parameters and load matches satisfying the conditions
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4 flex-wrap justify-between max-sm:justify-start">
        {fetchCardIndices.length > 1 && (
          <X
            className="w-6 h-6 absolute top-4 right-4 cursor-pointer"
            onClick={handleRemoveCard}
          />
        )}
        <div className="flex flex-col gap-4">
          <RequiredDialogInfo />
          <Select onValueChange={handleCountryChange} value={country}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              {availableCountries.map((country) => (
                <SelectItem key={uuidv4()} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div>
            <Input
              placeholder="League"
              className="w-[180px]"
              onChange={handleLeagueChange}
              value={league}
            />
            <AvailableLeaguesDialog country={country} />
          </div>
          <Textarea
            placeholder="Seasons"
            className="w-[180px]"
            onChange={handleSeasonsChange}
            value={seasons}
          />
        </div>

        <div className="flex flex-col gap-4">
          <OptionalDialogInfo />
          <Select>
            <SelectTrigger className="w-[180px]">
              <span>Statistical fields</span>
            </SelectTrigger>
            <SelectContent>
              {ALL_MATCH_DATA_KEYS.map((key) => (
                <div
                  key={uuidv4()}
                  className="hover:bg-neutral-100 py-1 flex items-center cursor-pointer"
                  onClick={() => handleStatisticFieldChange(key)}
                >
                  <Checkbox
                    checked={statisticFields.includes(key)}
                    onCheckedChange={() => handleStatisticFieldChange(key)}
                  />
                  <label className="pl-2 pointer-events-none">{key}</label>
                </div>
              ))}
            </SelectContent>
          </Select>

          <Textarea
            placeholder="Teams"
            className="w-[180px]"
            onChange={handleTeamsChange}
            value={teams}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchesFetchCard;
