import { Trophy, TrendingUpDown, TextSearch } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

const AvailableFunctionalities = () => {
  return (
    <section>
      <h3 className="text-4xl text-slate-50 text-center mb-8 tracking-wide font-bold">
        Available functionalities
      </h3>
      <div className="grid grid-flow-col max-lg:grid-flow-row gap-8 mx-8 justify-center">
        <Card className="py-6 max-w-[600px]">
          <CardContent className="grid">
            <div className="flex justify-center items-center gap-4 mb-4">
              <h2 className="text-2xl font-bold text-center">Matches</h2>
              <Trophy className="inline-flex" />
            </div>
            <p className="text-lg pb-4">
              Learn how to retrieve data about the football matches with high
              customization options. You can select the league, the season, the
              teams and even more.
            </p>
            <Button variant="teal" className="absolute bottom-4 right-4">
              <Link href="/matches?fetchCardAmount=1">Retrieve Matches</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="py-6 max-w-[600px]">
          <CardContent className="grid">
            <div className="flex justify-center items-center gap-4 mb-4">
              <h2 className="text-2xl font-bold text-center">Predict</h2>
              <TrendingUpDown className="inline-flex" />
            </div>
            <p className="text-lg pb-4">
              Predict the outcome of selected games to check your accuracy. To
              select the games you want to predict retrieve the matches and add
              one or more of them to the prediction list.
            </p>
            <Button variant="teal" className="absolute bottom-4 right-4">
              <Link href="/predict">Predict results</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="py-6 max-w-[600px]">
          <CardContent className="grid">
            <div className="flex justify-center items-center gap-4 mb-4">
              <h2 className="text-2xl font-bold text-center">API</h2>
              <TextSearch className="inline-flex" />
            </div>
            <p className="text-lg pb-4">
              Learn how to use the functionalities provided by the API. Each of
              them has a detailed description and examples to help you
              understand how to use them.
            </p>
            <Button variant="teal" className="absolute bottom-4 right-4">
              <Link href="/api">Get Started</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AvailableFunctionalities;
