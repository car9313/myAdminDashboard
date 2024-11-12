import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryProvider } from "./lib/react-query/QueryProvider";
import { ThemeProvider } from "./components/theme-provider";

/* const AdminPanel = lazy(
  () => import("@/components/layout/privates/LayoutDashboard")
); */
const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const AppShell = await import(
        "@/components/layout/privates/LayoutDashboard"
      );
      return { Component: AppShell.default };
    },
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import("./pages/privates/dashboard/Dashboard"))
            .default,
        }),
      },
      {
        path: "items",
        lazy: async () => ({
          Component: (await import("@/pages/privates/items/Items")).default,
        }),
      },
      {
        path: "settings",
        element: <div>SettingsPage</div>,
      },
    ],
  },
]);

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </ThemeProvider>
  );
};
export default App;
