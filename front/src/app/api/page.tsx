"use client";

import { CountriesApiContent } from "@/components/api/CountriesApiContent";
import { MatchesApiContent } from "@/components/api/MatchesApiContent";
import { MatchesFieldsApiContent } from "@/components/api/MatchesFieldsApiContent";
import { PredictApiContent } from "@/components/api/PredictApiContent";
import { SeasonsApiContent } from "@/components/api/SeasonsApiContent";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export default function ApiPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>("");

  const renderContent = () => {
    switch (selectedEndpoint) {
      case "seasons":
        return <SeasonsApiContent setSelectedEndpoint={setSelectedEndpoint} />;
      case "countries":
        return <CountriesApiContent />;
      case "predict":
        return <PredictApiContent setSelectedEndpoint={setSelectedEndpoint} />;
      case "matches":
        return <MatchesApiContent setSelectedEndpoint={setSelectedEndpoint} />;
      case "matchesFields":
        return <MatchesFieldsApiContent />;
      default:
        return null;
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [selectedEndpoint]);

  return (
    <section className="grid gap-4 justify-items-center relative w-full px-8 pt-4">
      <Card className="max-w-6xl min-w-[70%]">
        <CardHeader>
          <CardTitle>API</CardTitle>
          <CardDescription>
            Discover available endpoints and learn how to use them.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select
            onValueChange={(value) => setSelectedEndpoint(value)}
            value={selectedEndpoint}
          >
            <SelectTrigger className="w-[260px] text-left max-md:w-full">
              <SelectValue placeholder="Pick an endpoint" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="matchesFields">
                Get Available Matches Fields
              </SelectItem>
              <SelectItem value="seasons">Get Available Seasons</SelectItem>
              <SelectItem value="countries">Get Available Countries</SelectItem>
              <SelectItem value="predict">Predict results</SelectItem>
              <SelectItem value="matches">Get Matches</SelectItem>
            </SelectContent>
          </Select>
          {renderContent()}
        </CardContent>
      </Card>
    </section>
  );
}
