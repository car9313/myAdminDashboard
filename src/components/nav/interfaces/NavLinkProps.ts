import { SideLink } from "@/data/sidelinks";

export interface NavLinkProps extends SideLink {
  subLink?: boolean;
  closeNav: () => void;
}
