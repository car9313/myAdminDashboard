import { Outlet } from "react-router-dom";
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";
import { LayoutProvider } from "./context/LayoutContext";

export default function LayoutDashboard() {
  return (
    <div className="relative md:flex h-full overflow-hidden">
      {/*  <SkipToMain /> */}
      <Sidebar />
      <main
        id="content"
        className={`w-full overflow-x-hidden transition-[margin] md:overflow-y-hidden md:pt-0 h-full`}
      >
        <LayoutProvider>
          {/* ===== Top Heading ===== */}
          <LayoutProvider.Header sticky className="p-2">
            <Navbar />
          </LayoutProvider.Header>
          <LayoutProvider.Body>
            <Outlet />
          </LayoutProvider.Body>
        </LayoutProvider>
      </main>
    </div>
  );
}
