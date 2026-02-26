import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <>
      <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2 border border-gray-200 ">
        <Search className="w-4 h-4 text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Tìm kiếm phiên đấu giá..."
          className="bg-transparent flex-1 ml-2 text-sm outline-none text-gray-700 placeholder-gray-400"
        />
      </div>
    </>
  );
}
