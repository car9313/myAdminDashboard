import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavLinkProps } from "../interfaces/NavLinkProps";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/custom/button";
import useCheckActiveNav from "@/hooks/useCheckActiveNav";

const NavLinkIcon = ({ title, icon, label, href }: NavLinkProps) => {
  const { checkActiveNav } = useCheckActiveNav();
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          to={href}
          className={cn(
            buttonVariants({
              variant: checkActiveNav(href)
                ? "link_sidebar"
                : "link_sidebar_hover",
              size: "icon",
            }),
            "h-12 w-12"
          )}
        >
          {icon}
          <span className="sr-only">{title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-4">
        {title}
        {label && (
          <span className="ml-auto text-muted-foreground">{label}</span>
        )}
      </TooltipContent>
    </Tooltip>
  );
};
export default NavLinkIcon;
