import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Link from "next/link";

const NavbarButton = ({
  href,
  tooltipText,
  Icon,
}: {
  href: string;
  tooltipText: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) => {
  const currentPath = usePathname().split("?")[0];
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={`rounded-full transition-all duration-300 p-2 ${
            href.split("?")[0] === currentPath
              ? "bg-white scale-110"
              : "bg-white/60"
          } hover:bg-white hover:scale-110`}
        >
          <Link href={href}>
            <Icon stroke="#042f2ed9" />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <Link href={href}>{tooltipText}</Link>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NavbarButton;
