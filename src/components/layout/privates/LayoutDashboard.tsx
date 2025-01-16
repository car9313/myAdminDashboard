import { Outlet } from "react-router-dom";
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";
import { LayoutProvider } from "./context/LayoutContext";
import { Toaster } from "@/components/ui/toaster";

export default function LayoutDashboard() {
  return (
    <div className="relative md:flex h-full">
      <Sidebar />
      <main
        id="content"
        className={`w-full overflow-x-hidden transition-[margin] md:overflow-y-hidden  h-full`}
      >
        <LayoutProvider className=" bg-gradient-to-tl from-primary/10 to-background  ">
          <LayoutProvider.Header sticky>
            <Navbar />
          </LayoutProvider.Header>
          <LayoutProvider.Body>
            <Outlet />
          </LayoutProvider.Body>
        </LayoutProvider>
        <Toaster />
      </main>
    </div>
  );
}
