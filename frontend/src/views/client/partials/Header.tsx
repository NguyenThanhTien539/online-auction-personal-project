import { User, ShoppingCart, MapPin, ChevronRight } from "lucide-react";
import logo from "@/assets/image/auction-logo.svg";
import CategoryMenu from "@/views/client/components/header/CategoryMenu";
import SearchBar from "@/views/client/components/header/SearchBar";
export default function Header() {
  return (
    <header className="bg-blue-300 border-b border-gray-200 shadow-sm">
      {/* Top bar */}
      <div className="flex items-center gap-4 px-40 py-5">
        {/* Logo */}
        <div className="flex items-center gap-2 min-w-max">
          <img
            src={logo}
            alt="Auction Logo"
            className="cursor-pointer h-13 w-auto hover:opacity-75 hover:rotate-12 transition-all duration-300"
          />
          <h1 className="text-lg font-bold cursor-pointer text-gray-400 hover:text-gray-500 transition-colors duration-300 hidden sm:block">
            Online-Auction
          </h1>
        </div>

        {/* Category menu */}
        <CategoryMenu />

        {/* Search Bar */}
        <SearchBar />

        {/* Right nav */}
        <nav className="flex items-center gap-2 ml-5 shrink-0">
          <button className="flex items-center gap-2 text-white rounded-full px-4 py-2 hover:bg-blue-500 hover:border-blue-500 transition-colors duration-200">
            <User className="w-5 h-5" />
            <span className="text-sm font-medium">Đăng nhập</span>
          </button>
          <button className="flex items-center gap-2 text-white rounded-full px-4 py-2 hover:bg-blue-500 hover:border-blue-500 transition-colors duration-200 relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="text-sm font-medium">Giỏ hàng</span>
          </button>
          <button className="w-55 flex items-center gap-2 text-white border border-white/40 rounded-full px-4 py-2 hover:bg-blue-500 hover:border-blue-500 transition-colors duration-200 min-w-40 justify-between">
            <MapPin className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium flex-1 text-left">
              Hồ Chí Minh
            </span>
            <ChevronRight className="w-4 h-4 shrink-0 text-white/70" />
          </button>
        </nav>
      </div>
    </header>
  );
}
