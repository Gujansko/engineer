"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  const router = useRouter();
  const [redirectIn, setRedirectIn] = useState(3);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setRedirectIn((prev) => prev - 1);
    }, 1000);

    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(timer);
    };
  }, [router]);

  useEffect(() => {
    if (redirectIn <= 0) {
      setRedirectIn(0);
    }
  }, [redirectIn]);

  return (
    <div className="flex items-center flex-col flex-1 gap-1">
      <Image
        src="/404.svg"
        alt="404"
        width={500}
        height={500}
        priority={true}
      />
      <h1 className="text-2xl font-bold text-center text-slate-50">
        Page not found
      </h1>
      <h3 className="text-center text-slate-50">
        Redirecting to main page in {redirectIn} second
        {redirectIn !== 1 ? "s" : ""}
      </h3>
      <Button variant="link" className="text-xs mt-auto text-slate-300">
        <Link href="https://storyset.com/web">
          Web illustrations by Storyset{" "}
        </Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
