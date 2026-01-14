import decorImage1 from "@/assets/image/decor-auth-1.png";
import decorImage2 from "@/assets/image/decor-auth-2.png";
import logo from "@/assets/image/logo.png";
import backgroundImage from "@/assets/image/auth-green-signup.png";
import RegisterForm from "./ResigerForm";

export default function RegisterPage() {
  return (
    <>
      <div className="min-h-screen">
        {/* LEFT - FIXED - Ẩn trên mobile */}
        <div className="hidden lg:block bg-green-100 fixed left-0 top-0 h-screen w-[43%] overflow-hidden">
          <div className="flex items-center justify-center h-full">
            <img
              src={decorImage1}
              className="absolute top-0 left-0 z-10 h-118"
              alt="decor-auth-1"
            />

            <div className="flex flex-col items-center relative z-20 space-y-6">
              {/* Logo */}
              <div className=" px-8 py-4 rounded-lg flex flex-row items-center space-x-4 mb-1.5">
                <img
                  src={logo}
                  alt="VNA Logo"
                  className="cursor-pointer h-15"
                />
                <div className="text-green-500">
                  <h2 className="text-4xl font-bold ">NTT</h2>
                  <p className="text-primary ">Online Auction</p>
                </div>
              </div>
              {/* Title */}
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-green-500">
                  Nền tảng đấu giá trực tuyến VNA
                </h1>
                <p className="text-lg text-gray-700">
                  Tham gia dễ dàng, sở hữu nhanh chóng!
                </p>
              </div>

              <img
                src={backgroundImage}
                className="h-120 rounded-lg"
                alt="Background"
              />
            </div>

            <img
              src={decorImage2}
              className="absolute bottom-0 right-0 z-10 h-118"
              alt="decor-auth-2"
            />
          </div>
        </div>

        {/* RIGHT - CONTENT */}
        <div className="lg:ml-[43%] min-h-screen overflow-y-auto bg-green-100 lg:bg-white">
          {/* Logo và tên VNA - Hiện trên mobile, ẩn trên desktop */}
          <div className="lg:hidden w-full py-8 flex justify-center space-x-4 ">
            <img src={logo} alt="VNA Logo" className=" h-16" />
            <div className="text-green-500">
              <h2 className="text-4xl font-bold ">NTT</h2>
              <p className="text-primary ">Online Auction</p>
            </div>
          </div>

          <div className="flex items-center justify-center lg:mt-12 sm:mb-12 ">
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  );
}
