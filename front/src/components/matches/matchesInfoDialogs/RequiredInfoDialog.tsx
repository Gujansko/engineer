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
                Select country to checkout available leagues.
              </span>
            </p>
          </div>
          <div className={parameterWrapperClassName}>
            <h3 className={textTitleClassName}>League</h3>
            <p className={textBaseClassName}>
              Select one league to get matches from. {"\n\n"}If you select one
              league{" "}
              <span className={spanHighlightClassName}>
                the option to select new leagues from the same country{" "}
              </span>
              will appear below.{"\n\n"}To select leagues from a different
              country press the{" "}
              <span className={spanHighlightClassName}>
                Add new filter parameters
              </span>{" "}
              button.
            </p>
            <div className="mt-4">
              <h3 className={textTitleClassName}>Delete league</h3>
              <p className={textBaseClassName}>
                Press the <span className={spanHighlightClassName}>X </span>
                button next to seasons related to the league you want to delete.
              </p>
            </div>
          </div>
          <div>
            <h3 className={textTitleClassName}>Seasons</h3>
            <p className={textBaseClassName}>
              When you{" "}
              <span className={spanHighlightClassName}>select league </span>
              option to select new season will appear next to it. Select{" "}
              <span className={spanHighlightClassName}>
                one or more seasons
              </span>{" "}
              using checkboxes.
            </p>
            <div className="mt-4">
              <h3 className={textTitleClassName}>Delete season</h3>
              <p className={textBaseClassName}>
                <span className={spanHighlightClassName}>
                  Press the season related checkbox
                </span>{" "}
                to delete it.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequiredDialogInfo;
