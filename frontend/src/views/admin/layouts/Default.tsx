import { Outlet } from "react-router-dom";
import Header from "@/views/admin/partials/Header";
import Sidebar from "@/components/admin/Sidebar";

export default function DefaultLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
