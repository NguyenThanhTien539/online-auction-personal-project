import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { InputField } from "@/components/common/InputFiled";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="w-300 max-w-xl bg-white p-8 rounded-2xl shadow-xl border border-emerald-100 flex flex-col space-y-6">
      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-gray-800">
          Đăng nhập tài khoản
        </h1>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Email hoặc Số điện thoại */}
        <div>
          <InputField
            label="Số điện thoại/email"
            id="phoneOrEmail"
            placeholder="Nhập số điện thoại hoặc email"
          />
        </div>

        {/* Mật khẩu */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mật khẩu
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu"
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Quên mật khẩu */}
        <div className="flex justify-between items-center text-sm">
          <a
            href="/forgot-password"
            className="text-gray-700 hover:text-green-600 font-medium"
          >
            Quên mật khẩu?
          </a>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-full transition-colors shadow-lg hover:shadow-xl"
      >
        Đăng nhập
      </button>

      {/* Đăng ký */}
      <div className="text-center text-sm text-gray-600">
        Chưa có tài khoản?{" "}
        <a
          href="/accounts/register"
          className="text-green-600 hover:underline font-medium"
        >
          Đăng ký
        </a>
      </div>

      {/* Divider */}
      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-400">Hoặc tiếp tục với</span>
        </div>
      </div>

      {/* Social Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          className="flex-1 cursor-pointer flex items-center justify-center gap-2 py-3 px-4  transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-sm font-medium text-gray-700">Google</span>
        </button>
      </div>
    </form>
  );
}
