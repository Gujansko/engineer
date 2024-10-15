import JSONPretty from "react-json-pretty";
import "../../styles/JsonStyle.css";
import {
  matchesFieldsSchemaResponse,
  matchesFieldsExampleResponse,
} from "@/constants/matchesFieldsEndpoint.constants";

export const MatchesFieldsApiContent = () => {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 pt-8 items-baseline">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Method:</h2>
          <h3 className="text-lg text-[#f8f8f2] bg-[#0f172a] p-2 rounded-md break-all w-fit">
            <span className="text-rose-400">GET</span>
          </h3>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Endpoint address:</h2>
          <h3 className="text-lg text-[#f8f8f2] bg-[#0f172a] p-2 rounded-md break-all w-fit">
            <span className="text-green-400">/matches/fields</span>
          </h3>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="leading-10">
            <span className="text-green-400 bg-[#0f172a] p-2 rounded-md mr-2">
              /matches/fields
            </span>
            <span>Endpoint specific route.</span>
          </h4>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-1">Returns:</h2>
        <p className="text-base">
          A list of available statistical fields to get for the matches.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Schema:</h2>
        <div>
          <h3 className="text-base mb-1">Response Body:</h3>
          <JSONPretty data={matchesFieldsSchemaResponse} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Example:</h2>
        <div>
          <h3 className="text-base mb-1">Request address:</h3>
          <h3 className="text-lg text-[#f8f8f2] bg-[#0f172a] p-2 rounded-md break-all w-fit">
            <span className="text-green-400">/matches/fields</span>
          </h3>
        </div>
        <div>
          <h3 className="text-base mb-1">Response Body:</h3>
          <JSONPretty data={matchesFieldsExampleResponse} />
        </div>
      </div>
    </section>
  );
};
