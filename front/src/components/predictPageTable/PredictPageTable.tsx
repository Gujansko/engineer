import { X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { MatchToPredictWithId } from "@models/types/match-to-predict-with-id.type";
import { ActualPredictResult } from "@models/types/actual-predict-result.type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const PredictPageTable = ({
  matchesToPredict,
  predictionResults,
  pickedResults,
  handleResultChange,
  removeMatchToPredict,
  getActualResultTextColor,
}: {
  matchesToPredict: MatchToPredictWithId[];
  predictionResults: Map<string, ActualPredictResult>;
  pickedResults: Record<string, "A" | "H" | "D">;
  handleResultChange: (id: string, result: string) => void;
  removeMatchToPredict: (id: string) => void;
  getActualResultTextColor: (
    actualResult: string,
    predictedResult: string
  ) => string;
}) => {
  const getActualResultHeder = () => {
    if (predictionResults.size) {
      const correctPredictions = Array.from(predictionResults.values()).filter(
        (result) => result.actualResult === pickedResults[result.id]
      ).length;
      return `Actual Result ${correctPredictions}/${predictionResults.size}`;
    }
    return "Actual Result";
  };

  const getActualResultText = (actualResult: "A" | "H" | "D" | "") => {
    if (actualResult === "A") {
      return "Away";
    } else if (actualResult === "H") {
      return "Home";
    } else if (actualResult === "D") {
      return "Draw";
    }
    return "";
  };

  return (
    <Table className="pb-0">
      <TableCaption>A list of matches to predict.</TableCaption>
      <TableHeader>
        <TableRow>
          {Object.keys(matchesToPredict[0]).map((key) => (
            <TableHead key={key} hidden={key === "id"}>
              {key}
            </TableHead>
          ))}
          <TableCell>Result</TableCell>
          <TableCell hidden={!predictionResults.size}>
            {getActualResultHeder()}
          </TableCell>
          <TableCell align="right">Remove</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {matchesToPredict.map((matchToPredict) => (
          <TableRow key={matchToPredict.id}>
            {Object.values(matchToPredict).map((value, index) => (
              <TableCell key={index} hidden={value === matchToPredict.id}>
                {value}
              </TableCell>
            ))}
            <TableCell>
              <Select
                value={pickedResults[matchToPredict.id]}
                onValueChange={(value) =>
                  handleResultChange(matchToPredict.id, value)
                }
                disabled={predictionResults.size > 0}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="H">Home</SelectItem>
                  <SelectItem value="A">Away</SelectItem>
                  <SelectItem value="D">Draw</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell
              hidden={!predictionResults.size}
              className={`${getActualResultTextColor(
                predictionResults.get(matchToPredict.id)?.actualResult ?? "",
                pickedResults[matchToPredict.id]
              )} font-medium`}
            >
              {getActualResultText(
                predictionResults.get(matchToPredict.id)?.actualResult ?? ""
              )}
            </TableCell>
            <TableCell align="right">
              <Button
                variant="red"
                onClick={() => removeMatchToPredict(matchToPredict.id)}
                className="p-2"
              >
                <X className="w-6 h-6" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PredictPageTable;
