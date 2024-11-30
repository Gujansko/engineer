import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { MatchToPredictWithId } from "@models/types/match-to-predict-with-id.type";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import config from "@config/config";
import { createPredictionId } from "@/util/createPredictionId";

export default function ImportPredictionsDialog({
  onImport,
}: {
  onImport: (
    matchesToPredict: MatchToPredictWithId[],
    selectedResults: Record<string, "A" | "H" | "D">
  ) => void;
}) {
  const [matchesToPredict, setMatchesToPredict] = useState<
    MatchToPredictWithId[]
  >([]);
  const [predictedResults, setPredictedResults] = useState<
    Record<string, "A" | "H" | "D">
  >({});

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const handleJsonParse = (jsonString: string) => {
    try {
      const parsedMatches = JSON.parse(jsonString);
      if (!Array.isArray(parsedMatches)) {
        toast({
          title: "Invalid input",
          description: "Please paste a valid JSON array",
        });
        return;
      }

      const newMatches: any[] = [];
      const selectedResults: Record<string, "A" | "H" | "D"> = {};
      parsedMatches.forEach((match: any) => {
        const hasAllFields = config.predictFields.every(
          (field) => match[field] !== undefined
        );

        if (!hasAllFields) {
          return;
        }

        const newMatch: any = {};
        config.predictFields.forEach((field) => {
          newMatch[field] = match[field];
        });
        const matchId = createPredictionId(newMatch);
        newMatch.id = matchId;
        selectedResults[matchId] = match.result ?? "D";

        newMatches.push(newMatch);
      });

      setMatchesToPredict(newMatches as MatchToPredictWithId[]);
      setPredictedResults(selectedResults);
    } catch (error) {
      setMatchesToPredict([]);
      setPredictedResults({});
      toast({
        title: "Invalid input",
        description: "Please paste a valid JSON array",
      });
    }
  };

  const handleImport = () => {
    onImport(matchesToPredict, predictedResults);
    setIsDialogOpen(false);
    setMatchesToPredict([]);
    setPredictedResults({});
  };

  const onOpenChange = (isOpen: boolean) => {
    setIsDialogOpen(isOpen);
    setMatchesToPredict([]);
    setPredictedResults({});
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="secondary">Import predictions</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import predictions</DialogTitle>
          <DialogDescription>
            Paste the predictions you want to import in the text area below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-8 justify-items-end">
          <Textarea
            className="w-full"
            value={`${JSON.stringify(matchesToPredict ?? [])}${JSON.stringify(
              predictedResults ?? {}
            )}`}
            onKeyDown={(e) => {
              if (!(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== "v") {
                e.preventDefault();
              }
            }}
            onChange={(e) => {
              handleJsonParse(e.target.value);
            }}
            onPaste={(e) => {
              e.preventDefault();
              const pasteData = e.clipboardData.getData("text");
              handleJsonParse(pasteData);
            }}
          />
          <div className="flex gap-4">
            <Button
              className="w-fit"
              variant="secondary"
              onClick={() => {
                setMatchesToPredict([]);
                setPredictedResults({});
              }}
              disabled={
                !(
                  matchesToPredict.length ||
                  Object.keys(predictedResults).length
                )
              }
            >
              Clear input
            </Button>
            <Button
              className="w-fit"
              variant="teal"
              onClick={handleImport}
              disabled={!matchesToPredict.length}
            >
              Import
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
