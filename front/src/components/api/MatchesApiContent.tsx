import JSONPretty from "react-json-pretty";
import "../../styles/JsonStyle.css";
import {
  matchesSchemaResponse,
  matchesExampleResponse,
  matchesSchemaRequest,
  matchesExampleRequest,
} from "@/constants/matchesEndpoint.constants";

export const MatchesApiContent = () => {
  return (
    <section className="flex flex-col flex-wrap gap-8">
      <div className="flex flex-col flex-wrap gap-4 pt-8 items-baseline">
        <div className="flex flex-col flex-wrap gap-2">
          <h2 className="text-xl font-semibold">Endpoint address:</h2>
          <h3 className="text-lg text-[#f8f8f2] bg-[#0f172a] p-2 rounded-md break-all w-fit">
            <span className="text-green-400">/matches</span>
            <span className="text-yellow-400">?includeResults</span>
          </h3>
        </div>
        <div className="flex flex-col flex-wrap gap-4">
          <h4 className="leading-10">
            <span className="text-green-400 bg-[#0f172a] p-2 rounded-md mr-2">
              seasons
            </span>
            <span>Endpoint specific route.</span>
          </h4>
          <h4 className="leading-10">
            <span className="text-yellow-400 bg-[#0f172a] p-2 rounded-md mr-2">
              includeResults
            </span>
            <span>
              Boolean query value indicating whether to include match results in
              the response.
            </span>
          </h4>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-1">Returns:</h2>
        <p className="text-base">A list of matches.</p>
      </div>
      <div className="flex flex-col flex-wrap gap-2">
        <h2 className="text-xl font-semibold">Schema:</h2>
        <div className="flex flex-col flex-wrap gap-2">
          <div>
            <h3 className="text-base mb-1">Request Body:</h3>
            <JSONPretty data={matchesSchemaRequest} />
          </div>
          <h4 className="leading-10">
            <span className="text-orange-500 bg-[#0f172a] p-2 rounded-md mr-2">
              leagueCountry
            </span>
            <span>
              League country name. Available countries can be fetched using{" "}
            </span>
            <span className="text-[#f8f8f2] bg-[#0f172a] p-2 rounded-md">
              Get Available Countries
            </span>{" "}
            endpoint.
          </h4>
          <h4 className="leading-10">
            <span className="text-lime-500 bg-[#0f172a] p-2 rounded-md mr-2">
              leagueName
            </span>
            <span>
              Name of the league to get matches from. Available leagues can be
              fetched using{" "}
            </span>
            <span className="text-[#f8f8f2] bg-[#0f172a] p-2 rounded-md">
              Get Available Seasons
            </span>{" "}
            endpoint.
          </h4>
          <h4 className="leading-10">
            <span className="text-cyan-400 bg-[#0f172a] p-2 rounded-md mr-2">
              seasons
            </span>
            <span>
              Season of the league to get matches from. Available seasons can be
              fetched using{" "}
            </span>
            <span className="text-[#f8f8f2] bg-[#0f172a] p-2 rounded-md">
              Get Available Seasons
            </span>{" "}
            endpoint.
          </h4>
          <h4 className="leading-10">
            <span className="text-amber-500 bg-[#0f172a] p-2 rounded-md mr-2">
              fetchedFields
            </span>
            <span>
              Not required parameter setting statistical fields to be fetched
              for each match. If not provided default fields will be provided
              {" (look in the example response)"}. Available fields can be
              fetched using{" "}
              <span className="text-[#f8f8f2] bg-[#0f172a] p-2 rounded-md">
                Get Available Matches Fields
              </span>{" "}
              endpoint.
            </span>
          </h4>
          <h4 className="leading-10">
            <span className="text-violet-400 bg-[#0f172a] p-2 rounded-md mr-2">
              includedTeams
            </span>
            <span>
              Not required parameter containing teams that matches should be
              fetched.
            </span>
          </h4>
        </div>
        <div>
          <h3 className="text-base mb-1">Response Body:</h3>
          <JSONPretty data={matchesSchemaResponse} />
        </div>
      </div>
      <div className="flex flex-col flex-wrap gap-2">
        <h2 className="text-xl font-semibold">Example:</h2>
        <div>
          <h3 className="text-base mb-1">Request address:</h3>
          <h3 className="text-lg text-[#f8f8f2] bg-[#0f172a] p-2 rounded-md break-all w-fit">
            <span className="text-green-400">/matches</span>
            <span className="text-yellow-400">?includeResults=true</span>
          </h3>
        </div>
        <div>
          <h3 className="text-base mb-1">Request Body:</h3>
          <JSONPretty data={matchesExampleRequest} />
        </div>
        <div>
          <h3 className="text-base mb-1">Response Body:</h3>
          <JSONPretty data={matchesExampleResponse} />
        </div>
      </div>
    </section>
  );
};
