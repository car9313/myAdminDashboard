import { cn } from "@/lib/utils";
import { SideLink, sidelinks } from "@/data/sidelinks";
import { TooltipProvider } from "@/components/ui/tooltip";
import NavLink from "./components/NavLink";
import NavLinkDropdown from "./components/NavLinkDropdown";
import NavLinkIcon from "./components/NavLinkIcon";
import NavLinkIconDropdown from "./components/NavLinkIconDropdown";

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean;
  closeNav: () => void;
}

export default function Nav({ isCollapsed, className, closeNav }: NavProps) {
  const renderLink = ({ sub, ...rest }: SideLink) => {
    const key = `${rest.title}-${rest.href}`;
    if (isCollapsed && sub)
      return (
        <NavLinkIconDropdown
          {...rest}
          sub={sub}
          key={key}
          closeNav={closeNav}
        />
      );

    if (isCollapsed)
      return <NavLinkIcon {...rest} key={key} closeNav={closeNav} />;

    if (sub)
      return (
        <NavLinkDropdown {...rest} sub={sub} key={key} closeNav={closeNav} />
      );

    return <NavLink {...rest} key={key} closeNav={closeNav} />;
  };
  return (
    <div
      data-collapsed={isCollapsed}
      className={cn(
        "scrollOverflow group border-b bg-background py-2 transition-[max-height,padding] duration-500 data-[collapsed=true]:py-2 md:border-none",
        className
      )}
    >
      <TooltipProvider delayDuration={0}>
        <nav className="grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {sidelinks.map(renderLink)}
        </nav>
      </TooltipProvider>
    </div>
  );
}
