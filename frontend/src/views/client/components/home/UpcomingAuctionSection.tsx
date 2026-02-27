import AuctionCard from "./AuctionCard";

import { useEffect, useRef, useState } from "react";

const mockAuctions = [
  {
    id: 1,
    image: "https://placehold.co/400x300/c0953c/fff?text=Auction",
    organizerName: "TY ĐẦU GIÁ HỢP DANH M SƠN SÀI GÒN",
    title:
      "Quyền sử dụng đất và tài sản gắn liền với đất tại địa chỉ: Phường Tân Định, TX Bến Cát, Tỉnh Bình Dương (Nay là...",
    startingPrice: 1795830000,
    timeLeft: null,
  },
  {
    id: 2,
    image: "https://placehold.co/400x300/4a90d9/fff?text=BDS",
    organizerName: "TY ĐẦU GIÁ TOÀN CẦU",
    title:
      "Quyền sử dụng đất tại Phường 5, Quận 8, TP. Hồ Chí Minh – Lô đất 120m²",
    startingPrice: 3200000000,
    timeLeft: "01:23:45",
  },
  {
    id: 3,
    image: "https://placehold.co/400x300/27ae60/fff?text=XE",
    organizerName: "TY ĐẦU GIÁ PHÍA NAM",
    title: "Xe ô tô Toyota Camry 2.5Q 2022 – Biển số TP. HCM",
    startingPrice: 980000000,
    timeLeft: "00:45:10",
  },
  {
    id: 4,
    image: "https://placehold.co/400x300/8e44ad/fff?text=TIEM",
    organizerName: "TY ĐẦU GIÁ MỸ THUẬT",
    title:
      "Trang sức kim cương GIA – Dây chuyền vàng 18K đính hạt kim cương 1.2ct",
    startingPrice: 125000000,
    timeLeft: "02:10:00",
  },
];

export default function UpcomingAuctionSection() {
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
    <section
      ref={sectionRef}
      className={`py-12 px-6 transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Title */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <span className="flex-1 max-w-24 h-px bg-red-500 relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:border-t-[6px] after:border-t-transparent after:border-b-[6px] after:border-b-transparent after:border-l-[10px] after:border-l-red-500"></span>
        <h2 className="text-2xl font-bold text-gray-900 whitespace-nowrap">
          Tài sản sắp được đấu giá
        </h2>
        <span className="flex-1 max-w-24 h-px bg-red-500 relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:border-t-[6px] before:border-t-transparent before:border-b-[6px] before:border-b-transparent before:border-r-[10px] before:border-r-red-500"></span>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {mockAuctions.map((auction) => (
          <AuctionCard key={auction.id} {...auction} />
        ))}
      </div>
    </section>
  );
}
