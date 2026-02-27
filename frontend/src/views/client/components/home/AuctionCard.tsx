import { Share2, Gavel } from "lucide-react";

interface AuctionCardProps {
  image: string;
  organizerLogo?: string;
  organizerName?: string;
  title: string;
  startingPrice: number;
  timeLeft: string | null; // null = đã kết thúc
}

export default function AuctionCard({
  image,
  organizerName,
  title,
  startingPrice,
  timeLeft,
}: AuctionCardProps) {
  const isEnded = !timeLeft;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col w-64">
      {/* Timer */}
      <div className="px-4 pt-4 pb-2 text-center">
        <p className="text-xs text-gray-500">Thời gian còn lại</p>
        {isEnded ? (
          <p className="text-red-600 font-bold text-sm mt-0.5">Đã kết thúc</p>
        ) : (
          <p className="text-red-600 font-bold text-sm mt-0.5">{timeLeft}</p>
        )}
      </div>

      {/* Image */}
      <div className="relative">
        <img src={image} alt={title} className="w-full h-44 object-cover" />
        {organizerName && (
          <div className="absolute top-2 left-2 bg-red-600/80 text-white text-[10px] font-bold px-2 py-1 rounded leading-tight max-w-[120px]">
            {organizerName}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="px-4 py-3 flex flex-col gap-2 flex-1">
        <p className="text-sm font-semibold text-gray-800 leading-snug line-clamp-3">
          {title}
        </p>
        <p className="text-sm text-gray-600">
          Giá khởi điểm:{" "}
          <span className="text-red-600 font-semibold">
            {startingPrice.toLocaleString("vi-VN")} VNĐ
          </span>
        </p>
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 flex items-center justify-between">
        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200">
          <Gavel className="w-4 h-4" />
          Đấu Giá
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 text-gray-500">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
