import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { useUpdateQueryString } from "@/util/createQueryString";
import fetchMatches from "@/util/fetchMatches";
import { Dispatch, SetStateAction } from "react";
import { MatchData } from "@models/types/match-data.type";
import { useToast } from "@/hooks/use-toast";

const MatchesPageControlButtons = ({
  setMatchesData,
  setRequestBody,
}: {
  setMatchesData: Dispatch<SetStateAction<Partial<MatchData>[]>>;
  setRequestBody: Dispatch<SetStateAction<object>>;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const { createQueryString } = useUpdateQueryString();

  const fetchCardAmount = parseInt(
    searchParams.get("fetchCardAmount") || "1",
    10
  );

  const initialIncludeResults =
    searchParams.get("includeResults") === "false" ? false : true;

  const handleIncludeResultsChange = (isChecked: boolean) => {
    router.push(
      pathname +
        "?" +
        createQueryString("includeResults", isChecked ? "true" : "false"),
      {
        scroll: false,
      }
    );
  };

  const handleAddFilterParameters = () => {
    const params = new URLSearchParams(searchParams.toString());
    const newFetchCardAmount = fetchCardAmount + 1;
    params.set("fetchCardAmount", newFetchCardAmount.toString());
    router.push(pathname + "?" + params.toString(), {
      scroll: false,
    });
  };

  return (
    <div className="flex gap-4 justify-between min-w-[40%] max-xl:flex-col max-xl:items-center">
      <Badge
        variant="filled"
        className="flex gap-2 items-center max-xl:w-fit cursor-pointer hover:bg-slate-200"
        onClick={() => handleIncludeResultsChange(!initialIncludeResults)}
      >
        <Checkbox
          onCheckedChange={handleIncludeResultsChange}
          checked={initialIncludeResults}
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
          onClick={async () => {
            const newMatchData = await fetchMatches(searchParams);
            if (typeof newMatchData === "string") {
              toast({
                title: "Failed to load data",
                description: newMatchData,
                variant: "destructive",
              });
              return;
            }
            setMatchesData(newMatchData.matches);
            setRequestBody(newMatchData.requestBody);
          }}
          className="max-xl:w-fit"
        >
          Load data
        </Button>
      </div>
    </div>
  );
};

export default MatchesPageControlButtons;
