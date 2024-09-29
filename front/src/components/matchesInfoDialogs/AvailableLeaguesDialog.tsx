import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { SeasonInfo } from "@models/types/season-info.type";
import { useEffect, useState } from "react";
import { fetchAvailableLeagues } from "@/util/fetchAvailableLeagues";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { v4 as uuidv4 } from "uuid";

export default function AvailableLeaguesDialog({
  country,
}: {
  country: string;
}) {
  const [availableLeagues, setAvailableLeagues] = useState<SeasonInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const leagues = await fetchAvailableLeagues(country);
      setAvailableLeagues(leagues);
    };

    if (country) {
      fetchData();
    }
  }, [country]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="text-xs pl-1 py-0"
          variant="link"
          disabled={!country}
        >
          Checkout available leagues
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[50vw]">
        <DialogHeader>
          <DialogTitle>Available Leagues for {country}</DialogTitle>
          <DialogDescription>
            Each country can have different leagues depending on the season.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-8 max-md:grid-cols-2">
          {availableLeagues.map((league) => (
            <Accordion key={uuidv4()} type="single" collapsible>
              <AccordionItem value={league.season}>
                <AccordionTrigger>{league.season}</AccordionTrigger>
                <AccordionContent>
                  {league.leagues.map((leagueForYear) => (
                    <p key={uuidv4()}>{leagueForYear.name}</p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
