import { useEffect, useState } from "react";

const banners = [
  {
    id: 1,
    badge: "CÒN 4 NGÀY",
    title: "ĐẤU GIÁ FLASH\nGIẢM ĐẾN 70%",
    sub: "Hàng hiệu chính hãng – Giá khởi điểm cực thấp",
    tag: "MIỄN PHÍ ĐĂNG KÝ",
    cornerText: "Online\nAuction",
  },
  {
    id: 2,
    badge: "MỚI NHẤT",
    title: "PHIÊN ĐẤU GIÁ\nCONG NGHỆ",
    sub: "Smartphone • Laptop • Đồng hồ thông minh",
    tag: "FREESHIP 0Đ",
    cornerText: "Tech\nAuction",
  },
  {
    id: 3,
    badge: "ĐỘC QUYỀN",
    title: "BẤT ĐỘNG SẢN\nĐẤU GIÁ TRỰC TUYẾN",
    sub: "Đất nền • Căn hộ • Mặt bằng thương mại",
    tag: "HỖ TRỢ 24/7",
    cornerText: "Real\nEstate",
  },
  {
    id: 4,
    badge: "HOT NHẤT",
    title: "TRANG SỨC &\nĐỒ CỔ QUÝ HIẾM",
    sub: "Kim cương • Đá quý • Tác phẩm nghệ thuật",
    tag: "BẢO ĐẢM CHÍNH HÃNG",
    cornerText: "Art &\nJewels",
  },
];

export default function BannerSlide() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const banner = banners[current];

  return (
    <div className="w-3/5 relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50/80 to-white">
      {/* Radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-400/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-400/10 via-transparent to-transparent"></div>

      {/* Floating blur shapes */}
      <div className="absolute top-10 right-20 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-gradient-to-tr from-purple-400/15 to-pink-400/15 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-bl from-cyan-300/10 to-blue-300/10 rounded-full blur-3xl"></div>

      <div
        key={banner.id}
        className="w-full h-full flex items-center justify-between px-12 py-16 relative z-10"
      >
        {/* Badge */}
        <div className="absolute top-6 left-6 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full tracking-widest border border-blue-200">
          {banner.badge}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 z-10">
          <h2 className="font-extrabold text-4xl leading-tight whitespace-pre-line bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent drop-shadow-sm">
            {banner.title}
          </h2>
          <p className="text-slate-600 text-base">{banner.sub}</p>
          <span className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm px-5 py-2 rounded-full w-fit shadow-md shadow-blue-500/30">
            {banner.tag}
          </span>
        </div>

        {/* Corner badge */}
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-center text-sm leading-snug whitespace-pre-line shadow-xl shadow-blue-500/40">
          {banner.cornerText}
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current ? "bg-blue-500 scale-125" : "bg-blue-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
