import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MatchesRequestBody } from "@models/requests/matches-request-body.type";
import { LoaderCircle, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const MatchesSelectLeagueAndSeasons = ({
  matchFetchCardIndex,
  error,
  loading,
  country,
  availableLeagues,
  availableSeasons,
  matchesRequestBody,
  setMatchesRequestBody,
}: {
  matchFetchCardIndex: number;
  error: string;
  loading: boolean;
  country: string;
  availableLeagues: string[];
  availableSeasons: Record<string, string[]>;
  matchesRequestBody: MatchesRequestBody;
  setMatchesRequestBody: Dispatch<SetStateAction<MatchesRequestBody>>;
}) => {
  const [selectedLeague, setSelectedLeague] = useState<string>("");
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);

  useEffect(() => {
    setSelectedLeague("");
    setSelectedSeasons([]);
  }, [country]);

  const handleSeasonsChange = (season: string) => {
    const currentSeasons = selectedSeasons;
    let updatedSeasons;

    if (currentSeasons.includes(season)) {
      updatedSeasons = currentSeasons.filter((s) => s !== season);
    } else {
      updatedSeasons = [...currentSeasons, season];
    }

    setSelectedSeasons(updatedSeasons);

    setMatchesRequestBody((prevValue) => {
      const updatedRequestBody = [...prevValue];
      updatedRequestBody[matchFetchCardIndex] = {
        ...updatedRequestBody[matchFetchCardIndex],
        leagues: updatedRequestBody[matchFetchCardIndex].leagues.map((league) =>
          league.name === selectedLeague
            ? { ...league, seasons: updatedSeasons }
            : league
        ),
      };

      return updatedRequestBody;
    });
  };

  const handleLeagueChange = (league: string) => {
    setMatchesRequestBody((prevValue) => {
      const updatedRequestBody = [...prevValue];
      const existingLeagues = updatedRequestBody[matchFetchCardIndex].leagues;

      const filteredLeagues = existingLeagues.filter(
        (l) => l.name !== selectedLeague
      );

      if (!filteredLeagues.some((l) => l.name === league)) {
        filteredLeagues.push({
          name: league,
          seasons: [],
        });
      }

      updatedRequestBody[matchFetchCardIndex] = {
        ...updatedRequestBody[matchFetchCardIndex],
        leagues: filteredLeagues,
      };

      return updatedRequestBody;
    });

    setSelectedLeague(league);
    setSelectedSeasons([]);
  };

  const handleRemoveLeagueAndSeasons = () => {
    setMatchesRequestBody((prevValue) => {
      const updatedRequestBody = [...prevValue];

      if (updatedRequestBody[matchFetchCardIndex]) {
        const currentLeagues = updatedRequestBody[matchFetchCardIndex].leagues;

        const filteredLeagues = currentLeagues.filter(
          (league) => league.name !== selectedLeague
        );

        updatedRequestBody[matchFetchCardIndex] = {
          ...updatedRequestBody[matchFetchCardIndex],
          leagues: filteredLeagues,
        };
      }

      return updatedRequestBody;
    });
  };

  return (
    <div className={`${selectedLeague.length && "flex flex-wrap gap-4"}`}>
      {error && <p className="text-red-500 col-span-3">{error}</p>}
      {loading && (
        <LoaderCircle className="w-10 h-10 animate-spin col-span-3" />
      )}
      {!(error || loading) && (
        <>
          <Select
            onValueChange={handleLeagueChange}
            value={selectedLeague}
            disabled={!availableLeagues.length}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="League" />
            </SelectTrigger>
            <SelectContent>
              {availableLeagues.map((league) => (
                <SelectItem
                  key={uuidv4()}
                  value={league}
                  disabled={matchesRequestBody[
                    matchFetchCardIndex
                  ].leagues.some(
                    (pickedLeague) => pickedLeague.name === league
                  )}
                >
                  {league}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!availableLeagues.length && (
            <Button
              variant="ghost"
              disabled={true}
              className="text-xs pl-1 pt-1"
            >
              Select country to checkout leagues
            </Button>
          )}
          {!!selectedLeague.length && (
            <>
              <Select>
                <SelectTrigger className="w-[140px]">
                  <span>
                    {!!selectedSeasons.length
                      ? `${selectedSeasons.length} `
                      : "No "}
                    {selectedSeasons.length === 1 ? "Season" : "Seasons"}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {availableSeasons[selectedLeague].map((season) => (
                    <div
                      key={uuidv4()}
                      className="hover:bg-neutral-100 py-1 flex items-center cursor-pointer"
                      onClick={() => handleSeasonsChange(season)}
                    >
                      <Checkbox
                        checked={selectedSeasons.includes(season)}
                        onCheckedChange={() => handleSeasonsChange(season)}
                      />
                      <label className="pl-2 pointer-events-none">
                        {season}
                      </label>
                    </div>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="red"
                className="w-fit py-2 px-3"
                onClick={handleRemoveLeagueAndSeasons}
              >
                <X className="w-4 h-4" />
              </Button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MatchesSelectLeagueAndSeasons;
