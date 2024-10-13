import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Football Matches",
  description:
    "Fetch newest football matches from various leagues around the world, predict the outcome of the games and see how accurate you are.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-800 overflow-x-hidden grid justify-items-center`}
      >
        <Navbar />
        <main className="flex flex-col gap-2 w-screen relative">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
