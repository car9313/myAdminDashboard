import { buttonVariants } from "@/components/custom/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import useCheckActiveNav from "@/hooks/useCheckActiveNav";
import { cn } from "@/lib/utils";
import { IconChevronDown } from "@tabler/icons-react";
import { NavLinkProps } from "../interfaces/NavLinkProps";
import NavLink from "./NavLink";

const NavLinkDropdown = ({
  title,
  icon,
  label,
  sub,
  closeNav,
}: NavLinkProps) => {
  const { checkActiveNav } = useCheckActiveNav();
  /* Open collapsible by default
   * if one of child element is active */
  const isChildActive = !!sub?.find((s) => checkActiveNav(s.href));

  return (
    <Collapsible defaultOpen={isChildActive}>
      <CollapsibleTrigger
        className={cn(
          buttonVariants({ variant: "link_sidebar", size: "sm" }),
          "group h-12 w-full justify-start rounded-none px-6"
        )}
      >
        <div className="mr-2">{icon}</div>
        {title}
        {label && (
          <div className="ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground">
            {label}
          </div>
        )}
        <span
          className={cn(
            'ml-auto transition-all group-data-[state="open"]:-rotate-180'
          )}
        >
          <IconChevronDown stroke={1} />
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className="collapsibleDropdown" asChild>
        <ul>
          {sub!.map((sublink) => (
            <li key={sublink.title} className="my-1 ml-8">
              <NavLink {...sublink} subLink closeNav={closeNav} />
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};
export default NavLinkDropdown;
