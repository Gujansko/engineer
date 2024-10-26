import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Checkbox } from "../../ui/checkbox";
import fetchMatches from "@/util/fetchMatches";
import { Dispatch, SetStateAction, useState } from "react";
import { MatchData } from "@models/types/match-data.type";
import { useToast } from "@/hooks/use-toast";
import { MatchesRequestBody } from "@models/requests/matches-request-body.type";

const MatchesPageControlButtons = ({
  setMatchesData,
  setRequestBody,
  setLoading,
  setError,
  setFetchCardIndices,
  fetchCardIndices,
  matchesRequestBody,
}: {
  setMatchesData: Dispatch<SetStateAction<Partial<MatchData>[]>>;
  setRequestBody: Dispatch<SetStateAction<object>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
  setFetchCardIndices: Dispatch<SetStateAction<number[]>>;
  fetchCardIndices: number[];
  matchesRequestBody: MatchesRequestBody;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const [includeResults, setIncludeResults] = useState<boolean>(
    searchParams.get("includeResults") === "true"
  );

  const handleIncludeResultsChange = (isChecked: boolean) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("includeResults", isChecked.toString());
    router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  };

  const handleAddFilterParameters = () => {
    const unusedIndex = Math.max(...fetchCardIndices) + 1;
    setFetchCardIndices([...fetchCardIndices, unusedIndex]);
  };

  const handleFetchMatches = async () => {
    setLoading(true);
    try {
      const newMatchData = await fetchMatches(searchParams, matchesRequestBody);
      if (typeof newMatchData === "string") {
        toast({
          title: "Failed to load data",
          description: `Please try again, error: ${newMatchData}`,
          variant: "destructive",
        });
        return;
      }

      setMatchesData(newMatchData.matches);
      setRequestBody(newMatchData.requestBody);

      if (newMatchData.matches.length === 0) {
        toast({
          title: "No matches found",
          description: "Please try again with different filters",
          variant: "destructive",
        });
      }
    } catch (error) {
      setError("Failed to fetch matches, please try again later.");
      setMatchesData([]);
      setRequestBody({});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4 justify-between min-w-[40%] max-xl:flex-col max-xl:items-center">
      <Badge
        variant="filled"
        className="flex gap-2 items-center max-xl:w-fit cursor-pointer hover:bg-slate-200"
        onClick={() => {
          handleIncludeResultsChange(!includeResults);
          setIncludeResults((prevValue) => !prevValue);
        }}
      >
        <Checkbox
          onCheckedChange={handleIncludeResultsChange}
          checked={includeResults}
        />
        <label className="text-sm pointer-events-none">Include results</label>
      </Badge>
      <div className="flex gap-2 flex-wrap max-sm:items-center">
        <Button
          variant="teal"
          onClick={handleAddFilterParameters}
          className="max-xl:w-fit"
        >
          Add new filter parameters
        </Button>
        <Button
          variant="teal"
          onClick={handleFetchMatches}
          className="max-xl:w-fit"
          disabled={
            !matchesRequestBody.length ||
            !matchesRequestBody.every(
              (el) =>
                el.leaguesCountry.length &&
                el.leagues.length &&
                el.leagues.every(
                  (league) => league.name.length && league.seasons.length
                )
            )
          }
        >
          Load data
        </Button>
      </div>
    </div>
  );
};

export default MatchesPageControlButtons;
