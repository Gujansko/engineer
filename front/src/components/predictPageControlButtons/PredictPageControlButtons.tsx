import { useToast } from "@/hooks/use-toast";
import { getButtonVariant, handleCopy } from "@/util/copyButtonHandle";
import { predict } from "@/util/predict";
import RequestBodyDialog from "../matchesInfoDialogs/RequestBodyDialog";
import ImportPredictionsDialog from "../predictionDialogs/ImportPredictionsDialog";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { MatchToPredictWithId } from "@models/types/match-to-predict-with-id.type";
import { ActualPredictResult } from "@models/types/actual-predict-result.type";

const PredictPageControlButtons = ({
  pickedResults,
  matchesToPredict,
  predictionResults,
  exportStatus,
  setExportStatus,
  setPredictionResults,
  importPredictions,
}: {
  pickedResults: Record<string, "A" | "H" | "D">;
  matchesToPredict: MatchToPredictWithId[];
  predictionResults: Map<string, ActualPredictResult>;
  exportStatus: string;
  setExportStatus: Dispatch<SetStateAction<string>>;
  setPredictionResults: Dispatch<
    SetStateAction<Map<string, ActualPredictResult>>
  >;
  importPredictions: (matches: MatchToPredictWithId[]) => void;
}) => {
  const [requestBody, setRequestBody] = useState<object | null>(null);

  const { toast } = useToast();

  const exportPredictions = () => {
    handleCopy(
      matchesToPredict,
      setExportStatus,
      "Exported to clipboard",
      "Failed to export"
    );
  };

  const handlePredict = async () => {
    const predictionResult = await predict(matchesToPredict, pickedResults);

    if ("error" in predictionResult.response) {
      toast({
        title: "Failed to predict",
        description: predictionResult.response.error,
        variant: "destructive",
      });
      return;
    }
    setPredictionResults(
      new Map(
        predictionResult.response.results.map((result) => [result.id, result])
      )
    );
    setRequestBody(predictionResult.body);
  };

  return (
    <div className="flex flex-wrap gap-2 justify-between min-w-[60%] w-full">
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={getButtonVariant(
            exportStatus,
            "secondary",
            "Exported to clipboard",
            "Failed to export"
          )}
          disabled={!(matchesToPredict.length > 0)}
          onClick={exportPredictions}
        >
          {exportStatus}
        </Button>
        <ImportPredictionsDialog onImport={importPredictions} />
      </div>
      <div className="flex gap-2 flex-wrap">
        <Button
          disabled={!predictionResults.size}
          variant="teal"
          onClick={() => {
            setPredictionResults(new Map());
          }}
        >
          Clear predictions
        </Button>
        <Button
          variant="teal"
          disabled={predictionResults.size > 0}
          onClick={handlePredict}
        >
          Predict
        </Button>
      </div>
      {requestBody && predictionResults.size > 0 && (
        <RequestBodyDialog requestBody={requestBody} />
      )}
    </div>
  );
};

export default PredictPageControlButtons;
