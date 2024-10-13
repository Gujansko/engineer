import AvailableFunctionalities from "@/components/home/AvailableFunctionalities";
import LandingPage from "@/components/home/LandingPage";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent -z-40" />
      <LandingPage />
      <AvailableFunctionalities />
      <div className="flex flex-wrap gap-4 justify-center text-xs mt-10">
        <Button variant="link" className="px-0 w-fit">
          <Link
            href="https://storyset.com/web"
            target="_blank"
            className="text-slate-300"
          >
            Web illustrations by Storyset
          </Link>
        </Button>
        <Button variant="link" className="px-0 w-fit">
          <Link
            href="https://www.flaticon.com/free-icons/sport"
            target="_blank"
            title="sport icons"
            className="text-slate-300"
          >
            Sport icons created by mavadee - Flaticon
          </Link>
        </Button>
      </div>
    </>
  );
}
