import ReactDOM from "react-dom/client";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import "@/index.css";
import { AuthProvider } from "./store/auth/AuthContext";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { QueryProvider } from "./lib/react-query/QueryProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <QueryProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryProvider>
    <Toaster />
  </ThemeProvider>
);
