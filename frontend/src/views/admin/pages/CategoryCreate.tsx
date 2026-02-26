import TinyMCE from "@/common/TinyMCE";
import { path_admin } from "@/configs/variable.config";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

export default function CategoryCreate() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const editorRef = useRef(null);
  const value = "";
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="w-full space-y-10 px-2">
        <h1 className="font-medium text-3xl">Tạo danh mục</h1>
        <div className="border border-gray-300 rounded-xl bg-white px-10 py-10 text-gray-700 space-y-8">
          {/* hàng 1 */}
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-3">
              <label htmlFor="name">Tên danh mục*</label>
              <input
                type="text"
                name="name"
                id="name"
                className="border border-gray-300 rounded-sm px-4 py-2.5 bg-gray-100 outline-none "
              />
            </div>
            <div className="flex flex-col gap-3">
              <p>Danh mục cha</p>
              <select
                name="parent"
                id="parent"
                className="border border-gray-300 rounded-sm px-4 py-2.5 bg-gray-100 outline-none"
              >
                <option value="">-- Chọn danh mục --</option>
                <option value="tour-noi-dia">Tour nội địa</option>
                <option value="tour-nuoc-ngoai">Tour nước ngoài</option>
              </select>
            </div>
          </div>
          {/* hàng 2 */}
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-3">
              <p>Trạng thái</p>
              <select
                name="status"
                id="status"
                className="border border-gray-300 rounded-sm px-4 py-2.5 bg-gray-100 outline-none"
              >
                <option value="active">Đang hoạt động</option>
                <option value="inactive">Vô hiệu hóa</option>
              </select>
            </div>
          </div>
          {/* hàng 3 */}
          <div className="flex flex-col gap-3">
            <label htmlFor="avatar">Ảnh đại diện</label>
            <div className="flex items-start gap-4">
              {/* Khung ảnh đại diện */}
              <div className="relative">
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center group cursor-pointer">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <svg
                        className="w-8 h-8 mb-2 group-hover:text-gray-500 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <span className="text-xs text-center">Thêm ảnh</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* hàng 4 */}
          <div className="flex flex-col gap-3">
            <label className="block text-sm font-medium">Mô tả</label>
            <div className="w-full">
              <TinyMCE editorRef={editorRef} value={value} />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-4">
              <button className="border border-blue-500 bg-blue-500 rounded-xl px-10 py-5 cursor-pointer hover:bg-blue-600 text-white font-semibold transition-colors">
                Tạo mới
              </button>
              <Link
                to={`/${path_admin}/categories`}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Quay lại danh sách
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
