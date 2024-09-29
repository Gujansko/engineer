import MatchesFetchCard from "@/components/matchesFetchCard/MatchesFetchCard";
import config from "../../../../config/config";
import axios from "axios";
import ErrorComponent from "@/components/errorComponent/ErrorComponent";
import MatchesPageDataSection from "@/components/matchesPageDataSection/MatchesPageDataSection";

export default async function MatchesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] };
}) {
  try {
    if (!searchParams.fetchCardAmount) {
      throw new Error("Error: Incorrect url");
    }

    const fetchCardAmountRaw = searchParams.fetchCardAmount as string;
    let fetchCardAmount = parseInt(fetchCardAmountRaw, 10);

    if (isNaN(fetchCardAmount) || fetchCardAmount <= 0) {
      fetchCardAmount = 1;
    }

    const availableCountries = (
      await axios.get<{ countries: string[] }>(
        `${config.serverAddress}/countries`
      )
    ).data.countries;

    return (
      <section className="grid gap-4 justify-items-center relative w-full px-8 pt-4">
        {[...Array(Number(fetchCardAmount))].map((_, index) => (
          <MatchesFetchCard
            key={index}
            index={index}
            availableCountries={availableCountries}
          />
        ))}

        <MatchesPageDataSection />
      </section>
    );
  } catch (error: any) {
    return <ErrorComponent errorMessage={error.message} />;
  }
}
