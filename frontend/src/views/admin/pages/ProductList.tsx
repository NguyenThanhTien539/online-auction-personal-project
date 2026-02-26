import FilterBar from "@/views/admin/components/FilterBar";
import { DeleteButton, EditButton, EyeButton } from "@/common/Buttons";
import Pagination from "@/common/Pagination";
import { useSearchParams } from "react-router-dom";

const statusOptions = [
  { value: "all", label: "Trạng thái" },
  { value: "is_auction", label: "Đang đấu giá" },
  { value: "is_selling", label: "Đang bán" },
  { value: "is_sold", label: "Đã bán" },
  { value: "inactive", label: "Tạm dừng" },
];

const createByOptions = [
  { value: "all", label: "Người tạo" },
  { value: "admin", label: "Admin" },
  { value: "user", label: "Người dùng" },
];

export default function ProductList() {
  const totalPages = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const handlePageChange = (page: number) => {
    //set param page or call API
    setSearchParams({ page: page.toString() });
  };
  return (
    <>
      <div className="w-full space-y-6">
        <h1 className="font-medium text-3xl">Quản lý sản phẩm</h1>
        <FilterBar
          statusOptions={statusOptions}
          createByOptions={createByOptions}
          isShowDateFilter={false}
          isShowCreateButton={false}
        />
        <div className="bg-white border border-gray-300  rounded-lg shadow overflow-hidden">
          <table className="w-full ">
            <thead className="bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">
                  Tên sản phẩm
                </th>

                <th className="px-4 py-3 text-left font-medium text-gray-700">
                  Trạng thái
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">
                  Tạo bởi
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">
                  Cập nhật bởi
                </th>
                <th className="px-4 py-3 text-center font-medium text-gray-700">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="px-4 py-4 font-medium text-gray-900">
                  Iphone 14 Pro Max
                </td>

                <td className="px-4 py-4">
                  <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Hoạt động
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">Le Van A</div>
                    <div className="text-gray-500">23:10 - 08/10/2025</div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">Le Van A</div>
                    <div className="text-gray-500">23:10 - 08/10/2025</div>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="inline-flex border border-gray-300 rounded-md divide-x divide-gray-300">
                    <div className="px-3 py-2 flex items-center">
                      <EyeButton />
                    </div>
                    <div className="px-3 py-2 flex items-center">
                      <EditButton />
                    </div>
                    <div className="px-3 py-2 flex items-center">
                      <DeleteButton />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="px-4 py-4 font-medium text-gray-900">
                  Dây chuyền vàng 18k
                </td>

                <td className="px-4 py-4">
                  <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Hoạt động
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">Le Van A</div>
                    <div className="text-gray-500">23:10 - 08/10/2025</div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">Le Van A</div>
                    <div className="text-gray-500">23:10 - 08/10/2025</div>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="inline-flex border border-gray-300 rounded-md divide-x divide-gray-300">
                    <div className="px-3 py-2 flex items-center">
                      <EyeButton />
                    </div>

                    <div className="px-3 py-2 flex items-center">
                      <EditButton />
                    </div>
                    <div className="px-3 py-2 flex items-center">
                      <DeleteButton />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
