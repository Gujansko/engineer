"use client";

import PredictPageControlButtons from "@/components/predict/predictPageControlButtons/PredictPageControlButtons";
import PredictPageTable from "@/components/predict/predictPageTable/PredictPageTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { createPredictionId } from "@/util/createPredictionId";
import { ActualPredictResult } from "@models/types/actual-predict-result.type";
import { MatchToPredictWithId } from "@models/types/match-to-predict-with-id.type";
import { MatchToPredict } from "@models/types/match-to-predict.type";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function PredictPage() {
  const { toast } = useToast();

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
    try {
      const jsonMatchesToPredict = JSON.parse(
        localStorage.getItem("matchesToPredict") ?? "[]"
      );

      const matchesWithIds: MatchToPredictWithId[] = jsonMatchesToPredict.map(
        (match: MatchToPredict) => ({
          ...match,
          id: createPredictionId(match),
        })
      );
      setMatchesToPredict(matchesWithIds);

      const initialResults: Record<string, "A" | "H" | "D"> = {};
      matchesWithIds.forEach((match: any) => {
        initialResults[match.id] = "D";
      });

      setPickedResults(initialResults);
    } catch (error) {
      toast({
        title: "Invalid input",
        description: "Please paste a valid JSON array",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

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

  const importPredictions = (
    matches: MatchToPredictWithId[],
    predictionResults: Record<string, "A" | "H" | "D">
  ) => {
    setMatchesToPredict(matches);
    setPickedResults(predictionResults);
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
          {loading && (
            <div className="w-full h-40 grid justify-items-center items-center">
              <LoaderCircle className="w-10 h-10 animate-spin" />
            </div>
          )}
          {!loading && !!matchesToPredict.length ? (
            <PredictPageTable
              matchesToPredict={matchesToPredict}
              predictionResults={predictionResults}
              pickedResults={pickedResults}
              handleResultChange={handleResultChange}
              removeMatchToPredict={removeMatchToPredict}
              getActualResultTextColor={getActualResultTextColor}
            />
          ) : (
            !loading && (
              <div className="w-full h-40 grid justify-items-center items-center">
                <h2 className="text-lg font-medium">No matches to predict</h2>
              </div>
            )
          )}
        </CardContent>
      </Card>
      <PredictPageControlButtons
        pickedResults={pickedResults}
        matchesToPredict={matchesToPredict}
        predictionResults={predictionResults}
        exportStatus={exportStatus}
        loading={loading}
        setExportStatus={setExportStatus}
        setPredictionResults={setPredictionResults}
        importPredictions={importPredictions}
        setLoading={setLoading}
      />
    </section>
  );
}
