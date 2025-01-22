import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loader from "./components/loader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Dashboard</div>,
    children: [
      {
        path: "users",
        element: <div>UsersPage</div>,
      },
      {
        path: "settings",
        element: <div>SettingsPage</div>,
      },
    ],
  },
]);
const AppRouter = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
export default AppRouter;
