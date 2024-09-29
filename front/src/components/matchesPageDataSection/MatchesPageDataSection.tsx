"use client";

import { MatchData } from "@models/types/match-data.type";
import { MatchToPredict } from "@models/types/match-to-predict.type";
import MatchesPageControlButtons from "../matchesPageControlButtons/MatchesPageControlButtons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useEffect, useState } from "react";
import RequestBodyDialog from "../matchesInfoDialogs/RequestBodyDialog";
import { Button } from "../ui/button";
import { spanHighlightClassName } from "@/constants/parameters";
import { useToast } from "@/hooks/use-toast";
import React from "react";

const MatchesPageDataSection = () => {
  const [matchesData, setMatchesData] = useState<Partial<MatchData>[]>([]);
  const [requestBody, setRequestBody] = useState<object | null>(null);
  const [matchesToPredict, setMatchesToPredict] = useState<MatchToPredict[]>(
    []
  );

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
      <MatchesPageControlButtons
        setMatchesData={setMatchesData}
        setRequestBody={setRequestBody}
      />
      {matchesData.length > 0 ? (
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
            {matchesData.map((match, index) => (
              <>
                <TableRow key={index}>
                  {match?.season?.length &&
                  match?.leagueName?.length &&
                  match?.leagueCountry?.length ? (
                    <TableCell>
                      {!matchAlreadyAdded({
                        leagueName: match.leagueName ?? "",
                        season: match.season ?? "",
                        homeTeam: match.homeTeam ?? "",
                        awayTeam: match.awayTeam ?? "",
                        leagueCountry: match.leagueCountry ?? "",
                      }) ? (
                        <Button
                          variant="green"
                          onClick={() =>
                            addMatchToPredict({
                              leagueName: match.leagueName ?? "",
                              season: match.season ?? "",
                              homeTeam: match.homeTeam ?? "",
                              awayTeam: match.awayTeam ?? "",
                              leagueCountry: match.leagueCountry ?? "",
                            })
                          }
                        >
                          Add match to prediction
                        </Button>
                      ) : (
                        <Button
                          variant="red"
                          onClick={() =>
                            removeMatchToPredict({
                              leagueName: match.leagueName ?? "",
                              season: match.season ?? "",
                              homeTeam: match.homeTeam ?? "",
                              awayTeam: match.awayTeam ?? "",
                              leagueCountry: match.leagueCountry ?? "",
                            })
                          }
                        >
                          Remove match from prediction
                        </Button>
                      )}
                    </TableCell>
                  ) : (
                    <TableCell className="max-w-[100px]">
                      <p className="whitespace-pre-wrap">
                        Not enough data to add match to predict.{"\n\n"}
                        <span className={spanHighlightClassName}>
                          Required fields to predict are:{" "}
                        </span>
                        leagueName, leagueCountry, season, homeTeam and
                        awayTeam.
                      </p>
                    </TableCell>
                  )}
                  {Object.values(match).map((value, idx) => (
                    <TableCell key={`${index}-${idx}`}>{value}</TableCell>
                  ))}
                </TableRow>
              </>
            ))}
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
