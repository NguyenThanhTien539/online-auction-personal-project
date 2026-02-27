import HeroSection from "@/views/client/components/home/HeroSection";
import LiveAuctionSection from "@/views/client/components/home/LiveAuctionSection";
import UpcomingAuctionsSection from "@/views/client/components/home/UpcomingAuctionSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LiveAuctionSection />
      <UpcomingAuctionsSection />
    </>
  );
}
