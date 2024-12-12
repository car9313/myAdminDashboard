import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryProvider } from "./lib/react-query/QueryProvider";
import { ThemeProvider } from "./components/theme-provider";
import { AuthProvider } from "./context/authContext";
import GeneralError from "./pages/errors/general-error";
import NotFoundError from "./pages/errors/not-found-error";
import MaintenanceError from "./pages/errors/maintenance-error";
import UnauthorisedError from "./pages/errors/unauthorised-error";
import LayoutDashboard from "./components/layout/privates/LayoutDashboard";
import { lazyLoadPrivate, lazyLoadPublic } from "./utils/lazyLoad";

const router = createBrowserRouter([
  {
    path: "/login",
    element: lazyLoadPublic(() => import("@/pages/public/auth/Login")),
  },

  {
    path: "/",
    element: <LayoutDashboard />,
    children: [
      {
        path: "",
        element: lazyLoadPrivate(
          () => import("./pages/privates/dashboard/Dashboard"),
          "Audit",
          ["read"]
        ),
      },
      {
        path: "items",
        element: lazyLoadPrivate(
          () => import("@/pages/privates/items/Items"),
          "Item",
          ["read"]
        ),
      },
      {
        path: "itemsSPA",
        children: [
          {
            index: true,
            element: lazyLoadPrivate(
              () => import("./pages/privates/itemsSPA/itemsSPA"),
              "ItemSPA",
              ["read"]
            ),
          },
          {
            path: "add",
            element: lazyLoadPrivate(
              () => import("./pages/privates/itemsSPA/pages/AddItemSPA"),
              "ItemSPA",
              ["create"]
            ),
          },
          {
            path: "edit/:id",
            element: lazyLoadPrivate(
              () => import("./pages/privates/itemsSPA/pages/EditItemSPA"),
              "ItemSPA",
              ["update"]
            ),
          },
          {
            path: "view/:id",
            element: lazyLoadPrivate(
              () => import("./pages/privates/itemsSPA/pages/ViewItemSPA"),
              "ItemSPA",
              ["read"]
            ),
          },
        ],
      },
    ],
  },

  // Error routes
  { path: "/500", Component: GeneralError },
  { path: "/404", Component: NotFoundError },
  { path: "/503", Component: MaintenanceError },
  { path: "/401", Component: UnauthorisedError },

  // Fallback 404 route
  { path: "*", Component: NotFoundError },
]);

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
};
export default App;
