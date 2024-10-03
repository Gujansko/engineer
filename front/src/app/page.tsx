import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="relative px-8 sm:min-h-screen max-sm:pb-20 overflow-visible">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent -z-40"></div>
        <Image
          src="/soccer.svg"
          alt="Soccer ball"
          width={1300}
          height={1300}
          priority={true}
          className="absolute -top-1/3 left-0 -z-50 max-2xl:top-0 max-lg:max-h-screen"
        />
        <div className="flex flex-col items-end justify-end max-xl:justify-center max-xl:items-center">
          <h2 className="text-7xl tracking-widest text-slate-50 text-right pt-4 pb-2 font-extrabold xl:max-w-xl max-sm:text-5xl max-xl:text-center max-xl:mix-blend-multiply max-xl:text-teal-800">
            Find Newest Football Matches
          </h2>
          <div className="flex flex-col items-end gap-6 max-xl:items-center pt-12">
            <Badge className="text-lg text-center max-sm:text-sm">
              Get the latest football matches results from various leagues
              around the world
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
      <Button variant="link" className="text-xs mt-auto text-slate-300">
        <Link href="https://storyset.com/web" target="blank">
          Web illustrations by Storyset
        </Link>
      </Button>
    </>
  );
}
