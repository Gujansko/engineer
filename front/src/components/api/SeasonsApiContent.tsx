import JSONPretty from "react-json-pretty";
import "../../styles/JsonStyle.css";
import {
  seasonsSchemaResponse,
  seasonsExampleResponse,
} from "@/constants/seasonsEndpoint.constants";

export const SeasonsApiContent = () => {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 pt-8 items-baseline">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Endpoint address:</h2>
          <h3 className="text-lg text-[#f8f8f2] bg-[#0f172a] p-2 rounded-md break-all w-fit">
            <span className="text-green-400">/seasons</span>
            <span className="text-blue-400">/:leagueCountry</span>
          </h3>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="leading-10">
            <span className="text-green-400 bg-[#0f172a] p-2 rounded-md mr-2">
              seasons
            </span>
            <span>Endpoint specific route.</span>
          </h4>
          <h4 className="leading-10">
            <span className="text-blue-400 bg-[#0f172a] p-2 rounded-md mr-2">
              leagueCountry
            </span>
            <span>
              League country name. Available names can be fetched using the{" "}
              <span className="text-[#f8f8f2] bg-[#0f172a] p-2 rounded-md inline-block">
                Get Available Countries
              </span>{" "}
              endpoint.
            </span>
          </h4>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-1">Returns:</h2>
        <p className="text-base">
          A list of available seasons for the specified league country.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Schema:</h2>
        <div>
          <h3 className="text-base mb-1">Response Body:</h3>
          <JSONPretty data={seasonsSchemaResponse} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Example:</h2>
        <div>
          <h3 className="text-base mb-1">Request address:</h3>
          <h3 className="text-lg text-[#f8f8f2] bg-[#0f172a] p-2 rounded-md break-all w-fit">
            <span className="text-green-400">/seasons</span>
            <span className="text-blue-400">/England</span>
          </h3>
        </div>
        <div>
          <h3 className="text-base mb-1">Response Body:</h3>
          <JSONPretty data={seasonsExampleResponse} />
        </div>
      </div>
    </section>
  );
};
