import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routers from "./routes/main.route";
import "./global.css";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <>
    <Toaster
      richColors
      closeButton
      position="top-right"
      toastOptions={{
        style: {
          fontSize: "14px",
          padding: "8px 12px",
          width: "auto",
          height: "50px",
          borderRadius: "8px",
        },
      }}
    />
    <RouterProvider router={routers} />
  </>,
);
