import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routers from "./routes/main.route";
import "./global.css";

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={routers} />
);
