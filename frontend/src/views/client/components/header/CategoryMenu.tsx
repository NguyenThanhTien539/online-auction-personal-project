import { Menu, ChevronRight } from "lucide-react";
import { useState } from "react";
const categories = [
  {
    name: "Đang diễn ra",
    items: [
      {
        img: "https://placehold.co/80x80/FF4444/fff?text=LIVE",
        label: "Phiên đấu giá đang diễn ra",
      },
      {
        img: "https://placehold.co/80x80/FF6B35/fff?text=HOT",
        label: "Sắp kết thúc hôm nay",
      },
      {
        img: "https://placehold.co/80x80/FF8C00/fff?text=⚡",
        label: "Giá khởi điểm thấp",
      },
      {
        img: "https://placehold.co/80x80/FFA500/fff?text=NEW",
        label: "Mới mở phiên",
      },
      {
        img: "https://placehold.co/80x80/FFB347/333?text=TOP",
        label: "Nhiều người tham gia",
      },
      {
        img: "https://placehold.co/80x80/FFD700/333?text=💎",
        label: "Hàng độc quyền",
      },
    ],
  },
  {
    name: "Điện tử, Điện máy",
    items: [
      {
        img: "https://placehold.co/80x80/4A90D9/fff?text=📱",
        label: "Điện thoại & Tablet",
      },
      {
        img: "https://placehold.co/80x80/357ABD/fff?text=💻",
        label: "Laptop & Máy tính",
      },
      {
        img: "https://placehold.co/80x80/2E6DA4/fff?text=📷",
        label: "Máy ảnh & Quay phim",
      },
      {
        img: "https://placehold.co/80x80/1A5276/fff?text=🎮",
        label: "Thiết bị chơi game",
      },
      {
        img: "https://placehold.co/80x80/154360/fff?text=🖨",
        label: "Máy in & Văn phòng",
      },
      {
        img: "https://placehold.co/80x80/0B2F4E/fff?text=🔌",
        label: "Phụ kiện điện tử",
      },
    ],
  },
  {
    name: "Thời trang",
    items: [
      {
        img: "https://placehold.co/80x80/E91E8C/fff?text=👔",
        label: "Thời trang nam",
      },
      {
        img: "https://placehold.co/80x80/C2185B/fff?text=👗",
        label: "Thời trang nữ",
      },
      {
        img: "https://placehold.co/80x80/AD1457/fff?text=👟",
        label: "Giày dép",
      },
      {
        img: "https://placehold.co/80x80/880E4F/fff?text=👜",
        label: "Túi xách & Ví",
      },
      {
        img: "https://placehold.co/80x80/6A1B9A/fff?text=⌚",
        label: "Đồng hồ",
      },
      {
        img: "https://placehold.co/80x80/4A148C/fff?text=💍",
        label: "Trang sức",
      },
    ],
  },
  {
    name: "Đồ cổ, Nghệ thuật",
    items: [
      {
        img: "https://placehold.co/80x80/795548/fff?text=🏺",
        label: "Đồ gốm sứ cổ",
      },
      {
        img: "https://placehold.co/80x80/6D4C41/fff?text=🖼",
        label: "Tranh nghệ thuật",
      },
      {
        img: "https://placehold.co/80x80/5D4037/fff?text=🗿",
        label: "Tượng điêu khắc",
      },
      {
        img: "https://placehold.co/80x80/4E342E/fff?text=📜",
        label: "Tiền xu & Tem",
      },
      {
        img: "https://placehold.co/80x80/3E2723/fff?text=🪵",
        label: "Đồ gỗ mỹ nghệ",
      },
      {
        img: "https://placehold.co/80x80/BF360C/fff?text=💎",
        label: "Đá quý & Khoáng vật",
      },
    ],
  },
  {
    name: "Bất động sản",
    items: [
      { img: "https://placehold.co/80x80/27AE60/fff?text=🏠", label: "Nhà ở" },
      {
        img: "https://placehold.co/80x80/229954/fff?text=🏢",
        label: "Căn hộ chung cư",
      },
      {
        img: "https://placehold.co/80x80/1E8449/fff?text=🏗",
        label: "Đất nền dự án",
      },
      {
        img: "https://placehold.co/80x80/196F3D/fff?text=🏪",
        label: "Mặt bằng thương mại",
      },
      {
        img: "https://placehold.co/80x80/145A32/fff?text=🏞",
        label: "Đất nông nghiệp",
      },
      {
        img: "https://placehold.co/80x80/0E4024/fff?text=🏨",
        label: "Khách sạn & Resort",
      },
    ],
  },
  {
    name: "Xe cộ",
    items: [
      { img: "https://placehold.co/80x80/E74C3C/fff?text=🚗", label: "Ô tô" },
      { img: "https://placehold.co/80x80/CB4335/fff?text=🏍", label: "Xe máy" },
      {
        img: "https://placehold.co/80x80/B03A2E/fff?text=🚐",
        label: "Xe tải & Xe buýt",
      },
      { img: "https://placehold.co/80x80/922B21/fff?text=🚲", label: "Xe đạp" },
      {
        img: "https://placehold.co/80x80/7B241C/fff?text=⛵",
        label: "Thuyền & Ca nô",
      },
      {
        img: "https://placehold.co/80x80/641E16/fff?text=✈",
        label: "Máy bay mô hình",
      },
    ],
  },
  {
    name: "Nhà cửa, Nội thất",
    items: [
      {
        img: "https://placehold.co/80x80/F39C12/fff?text=🛋",
        label: "Sofa & Ghế",
      },
      {
        img: "https://placehold.co/80x80/D68910/fff?text=🛏",
        label: "Giường & Tủ",
      },
      {
        img: "https://placehold.co/80x80/B9770E/fff?text=🍽",
        label: "Bàn ghế phòng ăn",
      },
      {
        img: "https://placehold.co/80x80/9A7D0A/fff?text=💡",
        label: "Đèn trang trí",
      },
      {
        img: "https://placehold.co/80x80/7D6608/fff?text=🪴",
        label: "Cây cảnh & Decor",
      },
      {
        img: "https://placehold.co/80x80/6E2F05/fff?text=🔧",
        label: "Dụng cụ sửa chữa",
      },
    ],
  },
  {
    name: "Sách, Đồ sưu tầm",
    items: [
      {
        img: "https://placehold.co/80x80/8E44AD/fff?text=📚",
        label: "Sách cổ & Hiếm",
      },
      {
        img: "https://placehold.co/80x80/7D3C98/fff?text=🎵",
        label: "Đĩa nhạc & Vinyl",
      },
      {
        img: "https://placehold.co/80x80/6C3483/fff?text=🎬",
        label: "Phim & DVD",
      },
      {
        img: "https://placehold.co/80x80/5B2C6F/fff?text=🃏",
        label: "Thẻ bài sưu tầm",
      },
      {
        img: "https://placehold.co/80x80/4A235A/fff?text=🧸",
        label: "Đồ chơi vintage",
      },
      {
        img: "https://placehold.co/80x80/3B1A45/fff?text=🏆",
        label: "Cúp & Kỷ niệm chương",
      },
    ],
  },
];

export default function CategoryMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  return (
    <>
      <div
        className="relative"
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
      >
        <button className="flex items-center gap-2 hover:bg-white hover:text-black text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap">
          <Menu className="w-5 h-5" />
          <span>Danh mục</span>
        </button>

        {/* Dropdown menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 z-50 flex bg-white border border-gray-200 shadow-xl rounded-b-lg mt-0 w-180">
            {/* Left: category list */}
            <ul className="w-52 border-r border-gray-100 py-2 shrink-0">
              {categories.map((cat, idx) => (
                <li
                  key={idx}
                  onMouseEnter={() => setActiveCategory(idx)}
                  className={`px-4 py-2.5 cursor-pointer text-sm flex items-center justify-between transition-colors duration-150 ${
                    activeCategory === idx
                      ? "bg-blue-50 text-blue-600 font-semibold border-l-4 border-blue-600 hover:bg-white "
                      : "text-gray-800 font-normal bg-gray-100 border-l-4 border-transparent"
                  }`}
                >
                  {cat.name}
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </li>
              ))}
            </ul>

            {/* Right: items grid */}
            <div className="flex-1 p-4 overflow-auto max-h-105">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">
                {categories[activeCategory].name}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {categories[activeCategory].items.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 cursor-pointer group"
                  >
                    <img
                      src={item.img}
                      alt={item.label}
                      className="w-16 h-16 rounded-lg object-cover group-hover:scale-105 transition-transform duration-200 shadow-sm"
                    />
                    <span className="text-xs text-center text-gray-600 group-hover:text-blue-600 leading-tight">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
