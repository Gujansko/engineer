import { Badge } from "../ui/badge";
import Image from "next/image";

const LandingPage = () => {
  return (
    <section className="relative px-8 sm:min-h-screen max-sm:pb-20 overflow-visible">
      <Image
        src="/soccer.svg"
        alt="Soccer ball"
        width={1300}
        height={1300}
        priority={true}
        className="absolute -top-1/3 left-0 -z-50 max-2xl:top-0 max-lg:max-h-screen"
      />
      <div className="flex flex-col items-end justify-end max-xl:justify-center max-xl:items-center">
        <h2
          className="text-7xl tracking-widest text-slate-50 text-right pt-4 pb-2 font-extrabold xl:max-w-xl max-sm:text-5xl max-xl:text-center"
          style={{
            textShadow: "0 1px 0 rgba(30 41 59)",
          }}
        >
          Find Newest Football Matches
        </h2>
        <div className="flex flex-col items-end gap-6 max-xl:items-center pt-12">
          <Badge className="text-lg text-center max-sm:text-sm">
            Get the latest football matches results from various leagues around
            the world
          </Badge>
          <Badge className="text-lg text-center max-sm:text-sm">
            Predict the outcome of the games and see how accurate you are
          </Badge>
          <Badge className="text-lg text-center max-sm:text-sm">
            Learn how to use the api to get the matches you need
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
