import { createBrowserRouter } from "react-router-dom";
import homeRoute from "@/routes/client/home.route";
import accountRoute from "@/routes/client/account.route";

const router = createBrowserRouter([homeRoute, accountRoute]);

export default router;
