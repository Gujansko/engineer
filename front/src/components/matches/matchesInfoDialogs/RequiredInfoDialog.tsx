import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";
import {
  parameterWrapperClassName,
  spanHighlightClassName,
  textBaseClassName,
  textTitleClassName,
} from "@/constants/parameters";
import { Button } from "@/components/ui/button";

const RequiredDialogInfo = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex gap-2 items-center justify-start w-fit px-1"
          variant="ghost"
        >
          <h3>Required</h3>
          <Info className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[50vw]">
        <DialogHeader>
          <DialogTitle>Required Parameters</DialogTitle>
          <DialogDescription>
            These are the required parameters for the request to be fulfilled.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className={parameterWrapperClassName}>
            <h3 className={textTitleClassName}>Country</h3>
            <p className={textBaseClassName}>
              Select one country to choose leagues from. {"\n\n"}If you want to
              select matches from more than one country press the{" "}
              <span className={spanHighlightClassName}>
                Add new filter parameters{" "}
              </span>
              button and select another country.{"\n\n"}
              <span className={spanHighlightClassName}>
                Select country to checkout leagues/Checkout available leagues{" "}
              </span>
              button is disabled until a country is selected.
            </p>
          </div>
          <div className={parameterWrapperClassName}>
            <h3 className={textTitleClassName}>League</h3>
            <p className={textBaseClassName}>
              Select one league to get matches from. {"\n\n"}If you want to
              select matches from more than one league press the{" "}
              <span className={spanHighlightClassName}>
                Add new filter parameters{" "}
              </span>
              button and select another league.{"\n\n"}To show the available
              leagues select a country first then press the{" "}
              <span className={spanHighlightClassName}>
                Select country to checkout leagues/Checkout available leagues
              </span>{" "}
              button.
            </p>
          </div>
          <div>
            <h3 className={textTitleClassName}>Seasons</h3>
            <p className={textBaseClassName}>
              Type in one or more seasons to get matches from.{"\n\n"} The
              format of singular season should be{" "}
              <span className={spanHighlightClassName}>YYYY/YYYY.</span>
              {"\n\n"}To select multiple seasons separate them with a comma.{" "}
              <span className={spanHighlightClassName}>Example:</span>{" "}
              2019/2020, 2020/2021, 2021/2022.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequiredDialogInfo;
