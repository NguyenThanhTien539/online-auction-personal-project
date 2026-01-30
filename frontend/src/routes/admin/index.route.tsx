import dashboardRoute from "./dashboard.route";

const adminRoute = {
  path: "/admin",
  children: [dashboardRoute],
};

export default adminRoute;
