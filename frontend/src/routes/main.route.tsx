import { createBrowserRouter } from "react-router-dom";
import clientRoutes from "@/routes/client/index.route";
import adminRoutes from "@/routes/admin/index.route";

const router = createBrowserRouter([clientRoutes, adminRoutes]);

export default router;
