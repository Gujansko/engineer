"use client";

import { useState } from "react";
import MatchesFetchCard from "../matchesFetchCard/MatchesFetchCard";
import { LoaderCircle } from "lucide-react";
import MatchesPageDataSection from "@/components/matches/matchesPageDataSection/MatchesPageDataSection";
import { MatchesRequestBody } from "@models/requests/matches-request-body.type";

const MatchesMain = ({
  availableCountries,
}: {
  availableCountries: string[];
}) => {
  const [fetchCardIndices, setFetchCardIndices] = useState([0]);
  const [matchesRequestBody, setMatchesRequestBody] =
    useState<MatchesRequestBody>([]);

  return (
    <>
      {availableCountries.length > 0 ? (
        <>
          {fetchCardIndices.map((index) => (
            <MatchesFetchCard
              key={index}
              index={index}
              availableCountries={availableCountries}
              fetchCardIndices={fetchCardIndices}
              matchesRequestBody={matchesRequestBody}
              setFetchCardIndices={setFetchCardIndices}
              setMatchesRequestBody={setMatchesRequestBody}
            />
          ))}
          <MatchesPageDataSection
            fetchCardIndices={fetchCardIndices}
            setFetchCardIndices={setFetchCardIndices}
            matchesRequestBody={matchesRequestBody}
          />
        </>
      ) : (
        <LoaderCircle className="w-10 h-10 animate-spin col-span-3" />
      )}
    </>
  );
};

export default MatchesMain;
