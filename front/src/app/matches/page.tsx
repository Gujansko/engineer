import { redirect } from "next/navigation";
import config from "../../../../config/config";
import axios from "axios";
import ErrorComponent from "@/components/errorComponent/ErrorComponent";
import MatchesMain from "@/components/matches/matchesMain/MatchesMain";

export default async function MatchesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] };
}) {
  if (!searchParams.includeResults) {
    redirect("/matches?includeResults=true");
  }

  let availableCountries: string[] = [];

  try {
    const availableCountriesResponse = await axios.get<{ countries: string[] }>(
      `${config.serverAddress}/countries`
    );

    if (availableCountriesResponse.status !== 200) {
      throw new Error("Failed to fetch available countries");
    }

    availableCountries = availableCountriesResponse.data.countries;
  } catch (error: any) {
    console.error("Error fetching available countries:", error.message);
    return (
      <ErrorComponent
        errorMessage={
          "Failed to connect to the server. Please try again later."
        }
        additionalMessage={
          "Current server implementation allows for restarts due to inactivity. " +
          "The relaunch of service can take up to one minute."
        }
      />
    );
  }

  return (
    <section className="grid gap-4 justify-items-center relative w-full px-8 py-4">
      {availableCountries.length === 0 ? (
        <p>Loading available countries...</p>
      ) : (
        <MatchesMain availableCountries={availableCountries} />
      )}
    </section>
  );
}
