import JSONPretty from "react-json-pretty";
import "../../styles/JsonStyle.css";
import {
  predictSchemaResponse,
  predictExampleResponse,
  predictSchemaRequest,
  predictExampleRequest,
} from "@/constants/predictEndpoint.constants";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { apiRouteButtonClassName } from "@/constants/apiRouteButton.constants";

export const PredictApiContent = ({
  setSelectedEndpoint,
}: {
  setSelectedEndpoint: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 pt-8 items-baseline">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Method:</h2>
          <h3 className="text-lg text-[#f8f8f2] bg-[#0f172a] p-2 rounded-md break-all w-fit">
            <span className="text-fuchsia-400">POST</span>
          </h3>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Endpoint address:</h2>
          <h3 className="text-lg text-[#f8f8f2] bg-[#0f172a] p-2 rounded-md break-all w-fit">
            <span className="text-green-400">/predict</span>
          </h3>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="leading-10">
            <span className="text-green-400 bg-[#0f172a] p-2 rounded-md mr-2">
              predict
            </span>
            <span>Endpoint specific route.</span>
          </h4>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-1">Returns:</h2>
        <p className="text-base">A list of prediction results.</p>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Schema:</h2>
        <div className="flex flex-col gap-2">
          <div>
            <h3 className="text-base mb-1">Request Body:</h3>
            <JSONPretty data={predictSchemaRequest} />
          </div>
          <h4 className="leading-10">
            <span className="text-orange-500 bg-[#0f172a] p-2 rounded-md mr-2">
              leagueCountry
            </span>
            <span>
              League country name of the match to be predicted. Available
              countries can be fetched using{" "}
            </span>
            <Button
              className={apiRouteButtonClassName}
              onClick={() => setSelectedEndpoint("countries")}
            >
              Get Available Countries
            </Button>{" "}
            endpoint.
          </h4>
          <h4 className="leading-10">
            <span className="text-lime-500 bg-[#0f172a] p-2 rounded-md mr-2">
              leagueName
            </span>
            <span>
              Name of the league to of the matches to be predicted. Available
              leagues can be fetched using{" "}
            </span>
            <Button
              className={apiRouteButtonClassName}
              onClick={() => setSelectedEndpoint("seasons")}
            >
              Get Available Seasons
            </Button>{" "}
            endpoint.
          </h4>
          <h4 className="leading-10">
            <span className="text-cyan-400 bg-[#0f172a] p-2 rounded-md mr-2">
              season
            </span>
            <span>
              Season of the match to be predicted. Available seasons can be
              fetched using{" "}
            </span>
            <Button
              className={apiRouteButtonClassName}
              onClick={() => setSelectedEndpoint("seasons")}
            >
              Get Available Seasons
            </Button>{" "}
            endpoint.
          </h4>
          <h4 className="leading-10">
            <span className="text-amber-500 bg-[#0f172a] p-2 rounded-md mr-2">
              homeTeam
            </span>
            <span>
              Name of the team that plays at home in the match to be predicted.
            </span>
          </h4>
          <h4 className="leading-10">
            <span className="text-violet-400 bg-[#0f172a] p-2 rounded-md mr-2">
              awayTeam
            </span>
            <span>
              Name of the team that plays away in the match to be predicted.
            </span>
          </h4>
          <h4 className="leading-10">
            <span className="text-emerald-300 bg-[#0f172a] p-2 rounded-md mr-2">
              result
            </span>
            <span>
              The result of the match to be predicted. Possible values are{" "}
              <span className="text-[#f8f8f2] bg-[#0f172a] p-2 rounded-md">
                H
              </span>{" "}
              for home team win,{" "}
              <span className="text-[#f8f8f2] bg-[#0f172a] p-2 rounded-md">
                D
              </span>{" "}
              for draw,{" "}
              <span className="text-[#f8f8f2] bg-[#0f172a] p-2 rounded-md">
                A
              </span>{" "}
              for away team win.
            </span>
          </h4>
        </div>
        <div>
          <h3 className="text-base mb-1">Response Body:</h3>
          <JSONPretty data={predictSchemaResponse} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Example:</h2>
        <div>
          <h3 className="text-base mb-1">Request address:</h3>
          <h3 className="text-lg text-[#f8f8f2] bg-[#0f172a] p-2 rounded-md break-all w-fit">
            <span className="text-green-400">/predict</span>
          </h3>
        </div>
        <div>
          <h3 className="text-base mb-1">Request Body:</h3>
          <JSONPretty data={predictExampleRequest} />
        </div>
        <div>
          <h3 className="text-base mb-1">Response Body:</h3>
          <JSONPretty data={predictExampleResponse} />
        </div>
      </div>
    </section>
  );
};
