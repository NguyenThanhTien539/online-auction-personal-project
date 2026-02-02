import FilterBar from "@/components/admin/FilterBar";
import avatar from "@/assets/image/avatar.jpg";
export default function CategoryList() {
  return (
    <div className="w-full space-y-6">
      <h1 className="font-medium text-3xl">Quản lý danh mục</h1>
      <FilterBar />
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
                Vị trí
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
              <td className="px-4 py-4">
                <img
                  src={avatar}
                  alt=""
                  className="w-10 h-10 rounded-lg object-cover"
                />
              </td>
              <td className="px-4 py-4 text-gray-600">2</td>
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
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
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
              <td className="px-4 py-4 text-gray-600">2</td>
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
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
