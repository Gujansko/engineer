"use client";

import { House, TextSearch, TrendingUpDown, Trophy } from "lucide-react";
import NavbarButton from "./NavbarButton";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [navbarOpacity, setNavbarOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const newOpacity = Math.min(
        0.3,
        window.scrollY >= 100 ? 0.3 : window.scrollY / 100
      );
      setNavbarOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky left-0 right-0 top-0 flex justify-center px-8 ${
        navbarOpacity >= 0.3
          ? "shadow-xl pt-2 backdrop-blur-sm bg-teal-500/30"
          : "pt-4"
      }
        pb-4 rounded-b-[3rem] gap-6 z-50 w-fit align-middle transition-all duration-300`}
    >
      <NavbarButton href="/" Icon={House} tooltipText="Home" />
      <NavbarButton
        href="/matches?fetchCardAmount=1"
        Icon={Trophy}
        tooltipText="Matches"
      />
      <NavbarButton
        href="/predict"
        Icon={TrendingUpDown}
        tooltipText="Predict"
      />
      <NavbarButton href="/api" Icon={TextSearch} tooltipText="API" />
    </nav>
  );
};

export default Navbar;
