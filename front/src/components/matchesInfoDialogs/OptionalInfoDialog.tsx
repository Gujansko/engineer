import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";
import { Button } from "../ui/button";
import {
  parameterWrapperClassName,
  textTitleClassName,
  textBaseClassName,
  spanHighlightClassName,
} from "@/constants/parameters";
import config from "@config/config";

const OptionalDialogInfo = () => {
  const defaultStatisticalFields = config.fetchedFields;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex gap-2 items-center justify-start w-fit px-1"
          variant="ghost"
        >
          <h3>Optional</h3>
          <Info className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[50vw]">
        <DialogHeader>
          <DialogTitle>Optional Parameters</DialogTitle>
          <DialogDescription>
            These are the optional parameters for the request.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className={parameterWrapperClassName}>
            <h3 className={textTitleClassName}>Statistical fields</h3>
            <p className={textBaseClassName}>
              Select one or more statistical field to include in the response.
              {"\n\n"}If none are selected the default fields will be included.
              {"\n\n"}
              <span className={spanHighlightClassName}>Default fields: </span>
              {defaultStatisticalFields.join(", ")}.
            </p>
          </div>
          <div className={parameterWrapperClassName}>
            <h3 className={textTitleClassName}>Teams</h3>
            <p className={textBaseClassName}>
              Type in one or more team name to get matches for.
              {"\n\n"}To select multiple teams separate them with a comma.{" "}
              <span className={spanHighlightClassName}>Example:</span> Man
              United, Chelsea, Arsenal.{`\n\n`}If no teams are selected all of
              the teams will be included.
              {"\n\n"}Team name is treated as a match. For example if you type
              in <span className={spanHighlightClassName}>Man</span> it will
              select all matches of teams that have
              <span className={spanHighlightClassName}> Man</span> in their name
              <span className={spanHighlightClassName}>
                {" (Man United and Man City)"}
              </span>{" "}
              and maybe other teams that match the name requirement.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OptionalDialogInfo;
