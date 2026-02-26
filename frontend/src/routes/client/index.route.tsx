import homeRoute from "./home.route";
import accountRoutes from "./account.route";
import DefaultLayout from "@/views/client/layouts/Default";

const clientRoute = {
  path: "/",
  element: <DefaultLayout />,
  children: [homeRoute, accountRoutes],
};

export default clientRoute;
