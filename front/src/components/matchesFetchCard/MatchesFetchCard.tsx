"use client";

import { X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { ALL_MATCH_DATA_KEYS } from "@models/types/match-data.type";
import { Textarea } from "../ui/textarea";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useUpdateQueryStringWithIndex } from "@/util/createQueryStringWithIndex";
import { useState, useEffect } from "react";
import RequiredDialogInfo from "../matchesInfoDialogs/RequiredInfoDialog";
import OptionalDialogInfo from "../matchesInfoDialogs/OptionalInfoDialog";
import AvailableLeaguesDialog from "../matchesInfoDialogs/AvailableLeaguesDialog";
import { v4 as uuidv4 } from "uuid";

const MatchesFetchCard = ({
  availableCountries,
  index,
}: {
  availableCountries: string[];
  index: number;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const fetchCardAmount = parseInt(
    searchParams.get("fetchCardAmount") || "1",
    10
  );

  const [country, setCountry] = useState(
    searchParams.get(`country-${index}`) || ""
  );
  const [league, setLeague] = useState(
    searchParams.get(`league-${index}`) || ""
  );
  const [seasons, setSeasons] = useState(
    searchParams.get(`seasons-${index}`) || ""
  );
  const [teams, setTeams] = useState(searchParams.get(`teams-${index}`) || "");
  const [statisticFields, setStatisticFields] = useState<string>(
    searchParams.get(`statisticFields-${index}`) || ""
  );

  useEffect(() => {
    setCountry(searchParams.get(`country-${index}`) || "");
    setLeague(searchParams.get(`league-${index}`) || "");
    setSeasons(searchParams.get(`seasons-${index}`) || "");
    setTeams(searchParams.get(`teams-${index}`) || "");
    setStatisticFields(searchParams.get(`statisticFields-${index}`) || "");
  }, [searchParams, index]);

  const { createQueryString } = useUpdateQueryStringWithIndex(index);

  const handleCountryChange = (value: string) => {
    setCountry(value);
    updateQueryString("country", value);
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

  const updateQueryString = (param: string, value: string) => {
    if (param.length && value.length) {
      router.push(pathname + "?" + createQueryString(param, value), {
        scroll: false,
      });
    }
  };

  const handleUpdateOfParams = (
    param: string,
    value: string,
    params: URLSearchParams
  ) => {
    if (value.length) {
      params.set(param, value);
    } else {
      params.delete(param);
    }
    return params;
  };

  const updateAllQueryStrings = () => {
    let params = new URLSearchParams(searchParams.toString());

    params = handleUpdateOfParams(`country-${index}`, country, params);
    params = handleUpdateOfParams(`league-${index}`, league, params);
    params = handleUpdateOfParams(`seasons-${index}`, seasons, params);
    params = handleUpdateOfParams(`teams-${index}`, teams, params);
    params = handleUpdateOfParams(
      `statisticFields-${index}`,
      statisticFields,
      params
    );

    router.push(pathname + "?" + params.toString(), {
      scroll: false,
    });
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

    if (updatedFieldsString === "") {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(`statisticFields-${index}`);
      router.push(pathname + "?" + params.toString(), {
        scroll: false,
      });
      return;
    }
    router.push(
      pathname +
        "?" +
        createQueryString("statisticFields", updatedFieldsString),
      {
        scroll: false,
      }
    );
  };

  const handleRemoveCard = () => {
    if (fetchCardAmount <= 1) {
      return;
    }
    const params = new URLSearchParams(searchParams.toString());

    params.delete(`country-${index}`);
    params.delete(`league-${index}`);
    params.delete(`seasons-${index}`);
    params.delete(`teams-${index}`);
    params.delete(`statisticFields-${index}`);

    if (index + 1 < fetchCardAmount) {
      for (let i = index; i < fetchCardAmount; i++) {
        const country = searchParams.get(`country-${i + 1}`);
        const league = searchParams.get(`league-${i + 1}`);
        const seasons = searchParams.get(`seasons-${i + 1}`);
        const teams = searchParams.get(`teams-${i + 1}`);
        const statisticFields = searchParams.get(`statisticFields-${i + 1}`);

        if (!country && !league && !seasons && !teams && !statisticFields) {
          break;
        }

        if (country) {
          params.set(`country-${i}`, country);
        }
        if (league) {
          params.set(`league-${i}`, league);
        }
        if (seasons) {
          params.set(`seasons-${i}`, seasons);
        }
        if (teams) {
          params.set(`teams-${i}`, teams);
        }
        if (statisticFields) {
          params.set(`statisticFields-${i}`, statisticFields);
        }
      }

      params.delete(`country-${fetchCardAmount - 1}`);
      params.delete(`league-${fetchCardAmount - 1}`);
      params.delete(`seasons-${fetchCardAmount - 1}`);
      params.delete(`teams-${fetchCardAmount - 1}`);
      params.delete(`statisticFields-${fetchCardAmount - 1}`);
    }

    const newFetchCardAmount = fetchCardAmount - 1;
    params.set("fetchCardAmount", newFetchCardAmount.toString());

    router.push(pathname + "?" + params.toString(), {
      scroll: false,
    });
  };

  return (
    <Card
      className="max-w-6xl min-w-[40%]"
      onTouchEnd={updateAllQueryStrings}
      onMouseLeave={updateAllQueryStrings}
    >
      <CardHeader>
        <CardTitle>Filter parameters</CardTitle>
        <CardDescription>
          Set parameters and load matches satisfying the conditions
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4 flex-wrap justify-between max-sm:justify-start">
        {fetchCardAmount > 1 && (
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
              onBlur={() => updateQueryString("league", league)}
              onMouseLeave={() => updateQueryString("league", league)}
              onTouchEnd={() => updateQueryString("seasons", seasons)}
              value={league}
            />
            <AvailableLeaguesDialog country={country} />
          </div>
          <Textarea
            placeholder="Seasons"
            className="w-[180px]"
            onChange={handleSeasonsChange}
            onBlur={() => updateQueryString("seasons", seasons)}
            onMouseLeave={() => updateQueryString("seasons", seasons)}
            onTouchEnd={() => updateQueryString("seasons", seasons)}
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
            onBlur={() => updateQueryString("teams", teams)}
            onMouseLeave={() => updateQueryString("teams", teams)}
            onTouchEnd={() => updateQueryString("seasons", seasons)}
            value={teams}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchesFetchCard;
