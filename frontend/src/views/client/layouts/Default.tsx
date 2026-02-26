import Header from "@/views/client/partials/Header";
import Footer from "@/views/client/partials/Footer";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <div>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
