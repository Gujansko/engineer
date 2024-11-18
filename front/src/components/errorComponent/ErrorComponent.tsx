import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

const ErrorComponent = ({
  errorMessage,
  additionalMessage,
}: {
  errorMessage: string;
  additionalMessage?: string;
}) => {
  return (
    <div className="flex items-center flex-col flex-1 gap-1 pt-10">
      <h1 className="text-3xl font-bold text-center text-slate-50">Error</h1>
      <Image
        src="/bug.svg"
        alt="bug"
        width={500}
        height={500}
        priority={true}
      />
      <h2 className="text-2xl font-bold text-center text-slate-50">
        {errorMessage}
      </h2>
      {additionalMessage && (
        <h3 className="text-lg text-center text-slate-200">
          {additionalMessage}
        </h3>
      )}
      <Button variant="link" className="text-xs mt-auto text-slate-300">
        <Link href="https://storyset.com/web" target="_blank">
          Web illustrations by Storyset
        </Link>
      </Button>
    </div>
  );
};

export default ErrorComponent;
