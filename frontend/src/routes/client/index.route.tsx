import homeRoute from "./home.route";
import accountRoutes from "./account.route";

const clientRoute = {
  path: "/",
  children: [homeRoute, accountRoutes],
};

export default clientRoute;
