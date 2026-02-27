import { useEffect, useRef, useState } from "react";
import BannerSlide from "./BannerSlide";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section>
      <div
        ref={sectionRef}
        className={`flex items-stretch transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Left side */}
        <div className="relative w-2/5 flex flex-col justify-center px-16 py-20 gap-4 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50/80 to-white">
          <h2 className="relative z-10 text-red-700 font-semibold text-lg tracking-wide">
            Chào mừng bạn đến với Online-Auction
          </h2>
          <h1 className="relative z-10 font-bold text-4xl leading-tight bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
            Nền tảng đấu giá trực tuyến hàng đầu Việt Nam
          </h1>
          <p className="relative z-10 text-slate-600 text-base leading-relaxed">
            Tự hào là một trong những nhà đấu giá lớn nhất tại Việt Nam, Lạc
            Việt luôn là đơn vị tiên phong ứng dụng công nghệ thông tin vào hoạt
            động đấu giá. Ngày 17/07/2020, Lạc Việt vinh dự tổ chức thành công
            Cuộc đấu giá trực tuyến chính thống đầu tiên tại Việt Nam, mở ra 1
            chương mới cho hoạt động đấu giá nước nhà.
          </p>
        </div>

        {/* Right side */}
        <BannerSlide />
      </div>
    </section>
  );
}
