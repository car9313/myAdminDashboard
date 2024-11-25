import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryProvider } from "./lib/react-query/QueryProvider";
import { ThemeProvider } from "./components/theme-provider";
import { AuthProvider } from "./context/authContext";
import { lazyLoad } from "./utils/lazyLoad";
import ProtectedRoute from "./guards/ProtectedRoute";
/* 
const AdminPanel = lazy(
  () => import("@/components/layout/privates/LayoutDashboard")
); */
const router = createBrowserRouter([
  {
    path: "/login",
    element: lazyLoad(() => import("@/pages/public/auth/SignIn")),
  },

  {
    path: "/",
    element: <ProtectedRoute requiredResource="Audit" requiredAction="read" />,
    children: [
      {
        path: "",
        element: lazyLoad(
          () => import("@/components/layout/privates/LayoutDashboard")
        ),
        children: [
          {
            index: true,
            element: lazyLoad(
              () => import("./pages/privates/dashboard/Dashboard")
            ),
          },
          {
            path: "items",
            element: lazyLoad(() => import("@/pages/privates/items/Items")),
          },
          {
            path: "itemsSPA",
            element: lazyLoad(
              () => import("@/pages/privates/itemsSPA/itemsSPA")
            ),
          },
          {
            path: "itemsSPA/add", // Ruta para agregar un ítem
            element: lazyLoad(
              () => import("@/pages/privates/itemsSPA/pages/AddItemSPA")
            ),
          },
          {
            path: "itemsSPA/edit/:id", // Ruta para editar un ítem
            element: lazyLoad(
              () => import("@/pages/privates/itemsSPA/pages/EditItemSPA")
            ),
          },
          {
            path: "itemsSPA/view/:id", // Ruta para ver un ítem
            element: lazyLoad(
              () => import("@/pages/privates/itemsSPA/pages/ViewItemSPA")
            ),
          },
          {
            path: "settings",
            element: <div>SettingsPage</div>,
          },
        ],
      },
    ],
  },
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
