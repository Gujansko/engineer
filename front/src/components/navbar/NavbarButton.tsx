import { usePathname } from "next/navigation";
import Link from "next/link";

const NavbarButton = ({
  href,
  Icon,
}: {
  href: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) => {
  const currentPath = usePathname().split("?")[0];
  return (
    <div
      className={`rounded-full transition-all duration-300 p-2 ${
        href.split("?")[0] === currentPath
          ? "bg-white scale-110"
          : "bg-white/60"
      } hover:bg-white hover:scale-110`}
    >
      <Link href={href}>
        <Icon stroke="#042f2ed9" />
      </Link>
    </div>
  );
};

export default NavbarButton;
