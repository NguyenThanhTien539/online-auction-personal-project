import avatar from "@/assets/image/avatar.jpg";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center px-8 py-4">
        {/* Logo */}
        <div
          className="flex items-center gap-1 text-2xl font-bold cursor-pointer hover:opacity-80 transition-opacity ml-10"
          onClick={() => navigate("/admin/dashboard")}
        >
          <span className="text-blue-600">NTT</span>
          <span className="text-gray-800">Admin</span>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt="User Avatar"
            className="w-11 h-11 rounded-full object-cover border-2 border-gray-200"
          />
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold text-gray-800">
              Nguyễn Thanh Tiến
            </h2>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}
