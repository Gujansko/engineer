"use client";

import { MatchData } from "@models/types/match-data.type";
import { MatchToPredict } from "@models/types/match-to-predict.type";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { spanHighlightClassName } from "@/constants/parameters";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { LoaderCircle } from "lucide-react";
import config from "@config/config";
import MatchesPageControlButtons from "../matchesPageControlButtons/MatchesPageControlButtons";
import RequestBodyDialog from "../matchesInfoDialogs/RequestBodyDialog";
import { MatchesRequestBody } from "@models/requests/matches-request-body.type";
import { v4 as uuidv4 } from "uuid";

const MatchesPageDataSection = ({
  fetchCardIndices,
  setFetchCardIndices,
  matchesRequestBody,
}: {
  fetchCardIndices: number[];
  setFetchCardIndices: Dispatch<SetStateAction<number[]>>;
  matchesRequestBody: MatchesRequestBody;
}) => {
  const [matchesData, setMatchesData] = useState<Partial<MatchData>[]>([]);
  const [requestBody, setRequestBody] = useState<object | null>(null);
  const [matchesToPredict, setMatchesToPredict] = useState<MatchToPredict[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { toast } = useToast();

  useEffect(() => {
    setMatchesToPredict(
      JSON.parse(localStorage.getItem("matchesToPredict") ?? "[]")
    );
  }, []);

  const addMatchToPredict = (match: MatchToPredict) => {
    if (
      match.awayTeam === "" ||
      match.homeTeam === "" ||
      match.leagueName === "" ||
      match.leagueCountry === "" ||
      match.season === ""
    ) {
      toast({
        title: "Not enough arguments",
        description: "Please fill in all the required fields",
        variant: "destructive",
      });
      return;
    }

    setMatchesToPredict([...matchesToPredict, match]);
    localStorage.setItem(
      "matchesToPredict",
      JSON.stringify([...matchesToPredict, match])
    );
  };

  const removeMatchToPredict = (match: MatchToPredict) => {
    const newMatchesToPredict = matchesToPredict.filter(
      (matchToPredict) =>
        matchToPredict.leagueName !== match.leagueName ||
        matchToPredict.season !== match.season ||
        matchToPredict.homeTeam !== match.homeTeam ||
        matchToPredict.awayTeam !== match.awayTeam ||
        matchToPredict.leagueCountry !== match.leagueCountry
    );
    setMatchesToPredict(newMatchesToPredict);
    localStorage.setItem(
      "matchesToPredict",
      JSON.stringify(newMatchesToPredict)
    );
  };

  const matchAlreadyAdded = (match: MatchToPredict) => {
    return matchesToPredict.some(
      (matchToPredict) =>
        matchToPredict.leagueName === match.leagueName &&
        matchToPredict.season === match.season &&
        matchToPredict.homeTeam === match.homeTeam &&
        matchToPredict.awayTeam === match.awayTeam &&
        matchToPredict.leagueCountry === match.leagueCountry
    );
  };

  return (
    <>
      <Suspense
        fallback={
          <LoaderCircle className="w-10 h-10 animate-spin text-teal-500 mt-8" />
        }
      >
        <MatchesPageControlButtons
          setMatchesData={setMatchesData}
          setRequestBody={setRequestBody}
          setLoading={setLoading}
          setError={setError}
          setFetchCardIndices={setFetchCardIndices}
          fetchCardIndices={fetchCardIndices}
          matchesRequestBody={matchesRequestBody}
        />
      </Suspense>
      {error && <p className="text-red-500 mt-8">{error}</p>}
      {loading && (
        <LoaderCircle className="w-10 h-10 animate-spin text-teal-500 mt-8" />
      )}
      {!(error || loading) && matchesData.length > 0 ? (
        <Table>
          <TableCaption>A list of matches</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Predict</TableHead>
              {Object.keys(matchesData[0]).map((key) => (
                <TableHead key={key}>{key}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {matchesData.map((match, index) => {
              const isMatchAlreadyAdded = matchAlreadyAdded({
                leagueName: match.leagueName ?? "",
                season: match.season ?? "",
                homeTeam: match.homeTeam ?? "",
                awayTeam: match.awayTeam ?? "",
                leagueCountry: match.leagueCountry ?? "",
              });
              const matchFunction = isMatchAlreadyAdded
                ? removeMatchToPredict
                : addMatchToPredict;
              return (
                <TableRow key={`match-${index}`}>
                  {match?.season?.length &&
                  match?.leagueName?.length &&
                  match?.leagueCountry?.length ? (
                    <TableCell>
                      <Button
                        className="w-[160px] whitespace-normal py-2 h-fit"
                        variant={isMatchAlreadyAdded ? "red" : "green"}
                        onClick={() =>
                          matchFunction({
                            leagueName: match.leagueName ?? "",
                            season: match.season ?? "",
                            homeTeam: match.homeTeam ?? "",
                            awayTeam: match.awayTeam ?? "",
                            leagueCountry: match.leagueCountry ?? "",
                          })
                        }
                      >
                        {isMatchAlreadyAdded
                          ? "Remove match from predictions"
                          : "Add match to predictions"}
                      </Button>
                    </TableCell>
                  ) : (
                    <TableCell className="max-w-[100px]">
                      <p className="whitespace-pre-wrap">
                        Not enough data to add match to predict.{"\n\n"}
                        <span className={spanHighlightClassName}>
                          Required fields to predict are:{" "}
                        </span>
                        {config.predictFields.join(", ")}
                      </p>
                    </TableCell>
                  )}
                  {Object.values(match).map((value, idx) => (
                    <TableCell key={`match-${index}-${idx}`}>{value}</TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <></>
      )}
      {requestBody && <RequestBodyDialog requestBody={requestBody} />}
    </>
  );
};

export default MatchesPageDataSection;
