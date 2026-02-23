import DefaultLayout from "@/views/admin/layouts/Default";
import dashboardRoutes from "./dashboard.route";
import categoryRoutes from "./category.route";
import productRoutes from "./product.route";

const adminRoute = {
  path: "/admin",
  element: <DefaultLayout />,
  children: [dashboardRoutes, categoryRoutes, productRoutes],
};

export default adminRoute;
