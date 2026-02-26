import FilterBar from "@/views/admin/components/FilterBar";
import avatar from "@/assets/image/avatar.jpg";
import { DeleteButton, EditButton } from "@/common/Buttons";
import Pagination from "@/common/Pagination";
import { useSearchParams } from "react-router-dom";

export default function CategoryList() {
  const totalPages = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const handlePageChange = (page: number) => {
    //set param page or call API
    setSearchParams({ page: page.toString() });
  };

  return (
    <div className="w-full space-y-6">
      <h1 className="font-medium text-3xl">Quản lý danh mục</h1>
      <FilterBar
        isShowDateFilter={true}
        isShowCreateButton={true}
        createButtonText="+ Tạo mới"
        createUrl="/admin/categories/create"
      />
      <div className="bg-white border border-gray-300  rounded-lg shadow overflow-hidden">
        <table className="w-full ">
          <thead className="bg-gray-50 border-b border-gray-300">
            <tr>
              <th className="px-4 py-3 text-left">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Tên danh mục
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-700">
                Ảnh đại diện
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
              <th className="px-4 py-3 text-left font-medium text-gray-700">
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
                Tour nước ngoài
              </td>
              <td className="px-4 py-4 ">
                <img
                  src={avatar}
                  alt=""
                  className="w-10 h-10 rounded-lg object-cover"
                />
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
              <td className="px-4 py-4">
                <div className="inline-flex border border-gray-300 rounded-md divide-x divide-gray-300">
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
                Tour nước ngoài
              </td>
              <td className="px-4 py-4">
                <img
                  src={avatar}
                  alt=""
                  className="w-10 h-10 rounded-lg object-cover"
                />
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
              <td className="px-4 py-4">
                <div className="inline-flex border border-gray-300 rounded-md divide-x divide-gray-300">
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
  );
}
