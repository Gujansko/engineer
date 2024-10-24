import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SeasonInfo } from "@models/types/season-info.type";
import { useEffect, useState } from "react";
import { fetchAvailableLeagues } from "@/util/fetchAvailableLeagues";

import { v4 as uuidv4 } from "uuid";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AvailableLeaguesDialog({
  country,
}: {
  country: string;
}) {
  const [availableLeagues, setAvailableLeagues] = useState<SeasonInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const leagues = await fetchAvailableLeagues(country);
        setAvailableLeagues(leagues);
      } catch (error) {
        setError("Failed to fetch leagues, please try again later.");
      } finally {
        setLoading(false);
      }
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
          {!country
            ? "Select country to checkout leagues"
            : "Checkout available leagues"}
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[50vw]">
        <DialogHeader>
          <DialogTitle>Available Leagues for {country}</DialogTitle>
          <DialogDescription>
            Each country can have different leagues depending on the season.
          </DialogDescription>
        </DialogHeader>
        <div
          className={`grid grid-cols-3 gap-8 max-md:grid-cols-2 ${
            (error || loading) && "justify-items-center"
          }`}
        >
          {error && <p className="text-red-500 col-span-3">{error}</p>}
          {loading && (
            <LoaderCircle className="w-10 h-10 animate-spin col-span-3" />
          )}
          {!(error || loading) &&
            availableLeagues.map((league) => (
              <Accordion key={uuidv4()} type="single" collapsible>
                <AccordionItem value={league.season}>
                  <AccordionTrigger>{league.season}</AccordionTrigger>
                  <AccordionContent>
                    <p className="whitespace-pre-wrap">
                      {league.leagues
                        .map((insideLeague) => insideLeague.name)
                        .join(",\n")}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
