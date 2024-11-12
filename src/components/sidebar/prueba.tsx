import { LayoutProvider } from "@/layout/privates/context/LayoutContext";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import SidebarLogo from "./components/SidebarLogo";
import { Button } from "@/components/ui/button";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Nav from "../nav/Nav";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {}

const Sidebar1 = ({ className }: SidebarProps) => {
  return (
    <aside className="hidden md:flex md:w-64 bg-white shadow-lg flex-col">
      {/* Overlay in mobile */}
      {/* <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${navOpened ? "h-svh opacity-50" : "h-0 opacity-0"} w-full bg-black md:hidden`}
      /> */}
      <LayoutProvider fixed className="h-svh">
        {/* Header */}
        <LayoutProvider.Header
          sticky
          className="flex z-50 justify-between px-2"
        >
          <div className={`flex items-center gap-2`}>
            <SidebarLogo />
            <div
              className={`flex flex-col justify-end truncate visible w-auto`}
            >
              <span className="font-medium">Shadcn Admin</span>
              <span className="text-xs">ShadcnUI</span>
            </div>
          </div>
        </LayoutProvider.Header>
        {/* Navigation links */}
        {/*  <Nav id="sidebar-menu" /> */}
      </LayoutProvider>
    </aside>
  );
};
export default Sidebar1;
