import config from "../../../../config/config";
import axios from "axios";
import ErrorComponent from "@/components/errorComponent/ErrorComponent";
import MatchesMain from "@/components/matches/matchesMain/MatchesMain";

export default async function MatchesPage() {
  try {
    const availableCountries = (
      await axios.get<{ countries: string[] }>(
        `${config.serverAddress}/countries`
      )
    ).data.countries;

    return (
      <section className="grid gap-4 justify-items-center relative w-full px-8 py-4">
        <MatchesMain availableCountries={availableCountries} />
      </section>
    );
  } catch (error: any) {
    return <ErrorComponent errorMessage={error.message} />;
  }
}
