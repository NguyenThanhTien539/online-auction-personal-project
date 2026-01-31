import DefaultLayout from "@/views/admin/layouts/Default";
import dashboardRoute from "./dashboard.route";

const adminRoute = {
  path: "/admin",
  element: <DefaultLayout />,
  children: [dashboardRoute],
};

export default adminRoute;
