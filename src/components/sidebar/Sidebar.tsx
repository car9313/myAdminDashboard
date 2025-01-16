import { useEffect, useState } from "react";
import { IconChevronsLeft, IconMenu2, IconX } from "@tabler/icons-react";
import { Button } from "@/components/custom/button";
import Nav from "../nav/Nav";
import SidebarLogo from "./components/SidebarLogo";
import useIsCollapsed from "@/hooks/useIsCollapsed";
import { LayoutProvider } from "../layout/privates/context/LayoutContext";
import { sidelinks } from "@/data/sidelinks";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();
  const [navOpened, setNavOpened] = useState(false);

  /* Make body not scrollable when navBar is opened */
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [navOpened]);

  return (
    <aside
      className={` sticky left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted md:shadow-lg transition-[width] md:bottom-0 md:right-auto md:h-svh ${isCollapsed ? "md:w-14" : "md:w-80"}`}
    >
      {/* Overlay in mobile */}
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${navOpened ? "h-svh opacity-50" : "h-0 opacity-0"} w-full bg-black md:hidden`}
      />
      <LayoutProvider fixed className={` ${navOpened ? "h-svh" : ""} `}>
        {/* Header */}
        <LayoutProvider.Header
          sticky
          className="bg-background z-50 flex  justify-between px-4 md:px-4"
        >
          <div className={`flex items-center ${!isCollapsed ? "gap-2" : ""}`}>
            <SidebarLogo />
            <div
              className={`flex flex-col justify-end truncate ${isCollapsed ? "invisible w-0" : "visible w-auto"}`}
            >
              <span className="font-medium">Shadcn Admin</span>
              <span className="text-xs">Vite + ShadcnUI</span>
            </div>
          </div>

          {/* Toggle Button in mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle Navigation"
            aria-controls="sidebar-menu"
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? <IconX /> : <IconMenu2 />}
          </Button>
        </LayoutProvider.Header>

        {/* Navigation links */}
        <Nav
          id="sidebar-menu"
          className={` bg-background z-40 h-full flex-1 overflow-auto ${navOpened ? "max-h-screen" : "max-h-0 py-0 md:max-h-screen md:py-2"}`}
          closeNav={() => setNavOpened(false)}
          isCollapsed={isCollapsed}
          links={sidelinks}
        />

        {/* Scrollbar width toggle button */}
        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          size="icon"
          className="absolute -right-5 top-1/2 z-50 hidden rounded-full md:inline-flex shadow-sm"
        >
          <IconChevronsLeft
            stroke={1.5}
            className={`h-5 w-5 ${isCollapsed ? "rotate-180" : ""}`}
          />
        </Button>
      </LayoutProvider>
    </aside>
  );
}
