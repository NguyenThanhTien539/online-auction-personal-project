import { NavLink } from "react-router-dom";
import { path_admin } from "@/configs/variable.config";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Settings,
  FileText,
} from "lucide-react";

const menuItems = [
  {
    title: "Tổng quan",
    path: `/${path_admin}/dashboard`,
    icon: LayoutDashboard,
  },
  {
    title: "Quản lý danh mục",
    path: `/${path_admin}/categories`,
    icon: Users,
  },
  {
    title: "Products",
    path: `/${path_admin}/products`,
    icon: Package,
  },
  {
    title: "Auctions",
    path: `/${path_admin}/auctions`,
    icon: ShoppingCart,
  },
  {
    title: "Reports",
    path: `/${path_admin}/reports`,
    icon: FileText,
  },
  {
    title: "Settings",
    path: `/${path_admin}/settings`,
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <>
      <aside className="w-60 border-r border-gray-200 min-h-[calc(100vh-76px)] sticky top-[76px] bg-white">
        <nav className="p-4">
          <ul className="space-y-">
            {menuItems.map((item) => {
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                        isActive
                          ? "bg-blue-500 text-white font-medium"
                          : "text-gray-700 font-medium hover:bg-gray-50"
                      }`
                    }
                  >
                    <item.icon size={20} />
                    {item.title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
