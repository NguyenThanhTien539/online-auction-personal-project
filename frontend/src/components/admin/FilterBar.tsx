import { FilterIcon, UndoIcon } from "lucide-react";

export default function FilterBar() {
  return (
    <>
      <div className="w-[900px] flex items-stretch justify-start bg-white border border-gray-300 rounded-xl text-gray-800 font-semibold">
        <div className="flex items-center gap-2 text-lg  border-r border-gray-300 px-4 py-4">
          <FilterIcon size={20} className="text-gray-800" />
          <span>Bộ lọc</span>
        </div>
        <div className="flex items-center justify-center gap-2 border-r border-gray-300 px-4 py-4">
          <select
            name="status"
            id="status"
            className=" bg-white px-2 rounded outline-none cursor-pointer"
          >
            <option value="all">Trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Tạm dừng</option>
          </select>
        </div>
        <div className="flex items-center border-r border-gray-300 px-4 py-4">
          <select
            name="create_by"
            id="create_by"
            className=" bg-white px-2 rounded outline-none cursor-pointer"
          >
            <option value="all">Người tạo</option>
            <option value="admin">Admin</option>
            <option value="user">Người dùng</option>
          </select>
        </div>
        <div className="flex items-center border-r border-gray-300 gap-2 px-4 py-4 outline-none">
          {/* date picker */}
          <input
            type="date"
            className="bg-white cursor-pointer [&::-webkit-calendar-picker-indicator]:ml-[-15px] px-2"
          />
          <span>-</span>
          <input
            type="date"
            className="bg-white cursor-pointer [&::-webkit-calendar-picker-indicator]:ml-[-15px] px-2"
          />
        </div>
        <div className="flex items-center px-2 py-4">
          <button className="flex items-center gap-2 text-red-600 font-semibold px-2 py-1 rounded cursor-pointer ">
            <UndoIcon size={20} className="text-red-600" />
            <span>Xóa bộ lọc</span>
          </button>
        </div>
      </div>
    </>
  );
}
