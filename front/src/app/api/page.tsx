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
import { useState } from "react";

export default function ApiPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>("");

  const renderContent = () => {
    switch (selectedEndpoint) {
      case "seasons":
        return <SeasonsApiContent />;
      case "countries":
        return <CountriesApiContent />;
      case "predict":
        return <PredictApiContent />;
      case "matches":
        return <MatchesApiContent />;
      case "matchesFields":
        return <MatchesFieldsApiContent />;
      default:
        return null;
    }
  };

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
