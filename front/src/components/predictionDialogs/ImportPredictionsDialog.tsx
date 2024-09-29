import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { MatchToPredictWithId } from "@models/types/match-to-predict-with-id.type";
import { Textarea } from "../ui/textarea";

export default function ImportPredictionsDialog({
  onImport,
}: {
  onImport: (matchesToPredict: MatchToPredictWithId[]) => void;
}) {
  const [matchesToPredict, setMatchesToPredict] = useState<
    MatchToPredictWithId[]
  >([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleJsonParse = (jsonString: string) => {
    try {
      const parsedMatches = JSON.parse(jsonString);
      setMatchesToPredict(parsedMatches);
    } catch (error) {
      setMatchesToPredict([]);
    }
  };

  const handleImport = () => {
    onImport(matchesToPredict);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
            value={JSON.stringify(matchesToPredict ?? [])}
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
          <Button
            className="w-fit"
            variant="teal"
            onClick={handleImport}
            disabled={!matchesToPredict.length}
          >
            Import
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
