import decorImage1 from "@/assets/image/decor-auth-1.png";
import decorImage2 from "@/assets/image/decor-auth-2.png";
import backGroundImage from "@/assets/image/auth-green-login.png";
import logo from "@/assets/image/logo.png";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-[43%] bg-green-50 fixed left-0 top-0 h-screen">
        <div className="flex items-center justify-center h-full w-full relative">
          <img
            src={decorImage1}
            className="absolute top-0 left-0 z-10 h-118"
            alt="decor-auth-1"
          />
          <div className="flex flex-col items-center relative z-20 space-y-6">
            {/* logo */}
            <div className="flex flex-rows items-center space-x-4">
              <img className="h-15 cursor-pointer" src={logo} alt="Logo" />
              <div className="text-green-500">
                <h2 className="text-4xl font-bold ">NTT</h2>
                <p className="text-primary ">Online Auction</p>
              </div>
            </div>

            {/* Title */}
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold text-green-500">
                Nền tảng đấu giá trực tuyến VNA
              </h1>
              <p className="text-lg font-normal text-gray-700">
                Tham gia dễ dàng, sở hữu nhanh chóng!
              </p>
            </div>

            <img src={backGroundImage} alt="Background" className="h-110" />
          </div>
          <img
            src={decorImage2}
            className="absolute bottom-0 right-0 z-10 h-118"
            alt="decor-auth-2"
          />
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-[57%] lg:ml-[43%] min-h-screen bg-green-50 lg:bg-white flex items-center justify-center">
        <div className="w-full max-w-md px-4 flex flex-col items-center justify-center">
          {/* Logo và tên VNA - Hiện trên mobile, ẩn trên desktop */}
          <div className="lg:hidden w-full mb-8 flex justify-center space-x-4">
            <img src={logo} alt="VNA Logo" className="h-16" />
            <div className="text-green-500">
              <h2 className="text-4xl font-bold">NTT</h2>
              <p className="text-primary">Online Auction</p>
            </div>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
