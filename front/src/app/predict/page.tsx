"use client";

import PredictPageControlButtons from "@/components/predictPageControlButtons/PredictPageControlButtons";
import PredictPageTable from "@/components/predictPageTable/PredictPageTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ActualPredictResult } from "@models/types/actual-predict-result.type";
import { MatchToPredictWithId } from "@models/types/match-to-predict-with-id.type";
import { MatchToPredict } from "@models/types/match-to-predict.type";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function PredictPage() {
  const [matchesToPredict, setMatchesToPredict] = useState<
    MatchToPredictWithId[]
  >([]);
  const [pickedResults, setPickedResults] = useState<
    Record<string, "A" | "H" | "D">
  >({});
  const [loading, setLoading] = useState<boolean>(true);
  const [exportStatus, setExportStatus] =
    useState<string>("Export predictions");
  const [predictionResults, setPredictionResults] = useState<
    Map<string, ActualPredictResult>
  >(new Map());

  useEffect(() => {
    const jsonMatchesToPredict = JSON.parse(
      localStorage.getItem("matchesToPredict") ?? "[]"
    );
    const matchesWithIds: MatchToPredictWithId[] = jsonMatchesToPredict.map(
      (match: MatchToPredict) => ({
        ...match,
        id: uuidv4(),
      })
    );
    setMatchesToPredict(matchesWithIds);

    const initialResults: Record<string, "A" | "H" | "D"> = {};
    matchesWithIds.forEach((match: any) => {
      initialResults[match.id] = "D";
    });
    setPickedResults(initialResults);

    setLoading(false);
  }, []);

  const handleResultChange = (id: string, result: string) => {
    if (result === "A" || result === "H" || result === "D") {
      setPickedResults((prevResults) => ({
        ...prevResults,
        [id]: result,
      }));
    }
  };

  const removeMatchToPredict = (id: string) => {
    const newMatchesToPredict = matchesToPredict.filter(
      (match) => match.id !== id
    );

    const newResults = { ...pickedResults };
    delete newResults[id];

    setMatchesToPredict(newMatchesToPredict);
    setPickedResults(newResults);

    localStorage.setItem(
      "matchesToPredict",
      JSON.stringify(newMatchesToPredict)
    );
  };

  const importPredictions = (matches: MatchToPredictWithId[]) => {
    setMatchesToPredict(matches);

    const newResults: Record<string, "A" | "H" | "D"> = {};
    matches.forEach((match) => {
      newResults[match.id] = "D";
    });
    setPickedResults(newResults);
    setExportStatus("Export predictions");
    setPredictionResults(new Map());

    localStorage.setItem("matchesToPredict", JSON.stringify(matches));
  };

  const getActualResultTextColor = (
    actualResult: string,
    predictedResult: string
  ) => {
    if (actualResult === predictedResult) {
      return "text-green-500";
    } else {
      return "text-red-500";
    }
  };

  return (
    <section className="grid gap-4 justify-items-center relative w-full px-72 pt-4 max-xl:px-20 max-sm:px-8">
      <Card className="min-w-[60%] w-full">
        <CardHeader className="pb-0">
          <CardTitle>Matches to predict</CardTitle>
          <CardDescription>
            Select whether the home or away team will win each match.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-0">
          {matchesToPredict.length ? (
            <PredictPageTable
              matchesToPredict={matchesToPredict}
              predictionResults={predictionResults}
              pickedResults={pickedResults}
              handleResultChange={handleResultChange}
              removeMatchToPredict={removeMatchToPredict}
              getActualResultTextColor={getActualResultTextColor}
            />
          ) : (
            <div className="w-full h-40 grid justify-items-center items-center">
              {loading ? (
                <LoaderCircle className="w-10 h-10 animate-spin" />
              ) : (
                <h2 className="text-lg font-medium">No matches to predict</h2>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      <PredictPageControlButtons
        pickedResults={pickedResults}
        matchesToPredict={matchesToPredict}
        predictionResults={predictionResults}
        exportStatus={exportStatus}
        setExportStatus={setExportStatus}
        setPredictionResults={setPredictionResults}
        importPredictions={importPredictions}
      />
    </section>
  );
}
