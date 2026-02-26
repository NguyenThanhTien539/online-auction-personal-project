import { FilterIcon, UndoIcon, Search } from "lucide-react";
import { CreateButton } from "@/common/Buttons";
import { path_admin } from "@/configs/variable.config";

interface StatusOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  statusOptions?: StatusOption[];
  createByOptions?: StatusOption[];
  isShowDateFilter: boolean;
  isShowCreateButton: boolean;
  createButtonText?: string;
  createUrl?: string;
}

export default function FilterBar({
  statusOptions = [
    { value: "all", label: "Trạng thái" },
    { value: "active", label: "Hoạt động" },
    { value: "inactive", label: "Tạm dừng" },
  ],
  isShowDateFilter = true,
  isShowCreateButton = false,
  createButtonText = "+ Tạo mới",
  createUrl = path_admin + "/create",
  createByOptions = [
    { value: "all", label: "Người tạo" },
    { value: "admin", label: "Admin" },
    { value: "user", label: "Người dùng" },
  ],
}: FilterBarProps) {
  return (
    <>
      <div className="space-y-5">
        <div className="w-fit flex items-stretch justify-start bg-white border border-gray-300 rounded-xl text-gray-800 font-semibold">
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
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center border-r border-gray-300 px-4 py-4">
            <select
              name="create_by"
              id="create_by"
              className=" bg-white px-2 rounded outline-none cursor-pointer"
            >
              {createByOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {isShowDateFilter && (
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
          )}
          <div className="flex items-center px-2 py-4">
            <button className="flex items-center gap-2 text-red-600 font-semibold px-2 py-1 rounded cursor-pointer ">
              <UndoIcon size={20} className="text-red-600" />
              <span>Xóa bộ lọc</span>
            </button>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-8">
          <div className="flex items-center gap-0 border border-gray-300 rounded-lg w-fit">
            <div className="border-r border-gray-300 px-3 py-5 ">
              <select
                name="action"
                id="action"
                className="bg-white text-gray-800 font-semibold outline-none cursor-pointer"
              >
                <option value="bulk">-- Hành động --</option>
                <option value="delete">Xóa</option>
                <option value="activate">Kích hoạt</option>
                <option value="deactivate">Tạm dừng</option>
              </select>
            </div>
            <div className="text-red-500 px-4 py-5 font-semibold cursor-pointer">
              Áp dụng
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-5 text-gray-800 outline-none  w-90 font-medium transition-colors"
            />
            <Search
              size={25}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900"
            />
          </div>

          {isShowCreateButton && (
            <>
              <div>
                <CreateButton url={createUrl} name={createButtonText} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
