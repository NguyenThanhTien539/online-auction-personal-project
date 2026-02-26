/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { InputField } from "@/common/InputFiled";
import { useNavigate } from "react-router-dom";
import JustValidate from "just-validate";
import { toast } from "sonner";
import GoogleAuthButton from "../GoogleAuthButton";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const validator = new JustValidate("#login-form");

    validator
      .addField("#email", [
        {
          rule: "required",
          errorMessage: "Vui lòng nhập email",
        },
        {
          rule: "email",
          errorMessage: "Email không hợp lệ",
        },
      ])
      .addField("#password", [
        {
          rule: "required",
          errorMessage: "Vui lòng nhập mật khẩu",
        },
      ])
      .onSuccess((event: any) => {
        // Handle form submission here
        const email = event.target.email.value;
        const password = event.target.password.value;
        const rememberMe = event.target.rememberMe.checked;
        const finalData = {
          email: email,
          password: password,
          rememberMe: rememberMe,
        };

        fetch(`${import.meta.env.VITE_API_URL}/api/accounts/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Important: send cookies
          body: JSON.stringify(finalData),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.code === "success") {
              toast.success(data.message);
              navigate("/"); // Redirect to home page on successful login
            } else {
              toast.error(data.message);
            }
          })
          .catch((error) => {
            console.error("Error during login:", error);
          });
      });
  }, []);

  return (
    <form
      id="login-form"
      className="w-300 max-w-xl bg-white p-8 rounded-2xl shadow-xl border border-emerald-100 flex flex-col space-y-6"
    >
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
          <InputField label="Email" id="email" placeholder="Nhập email" />
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

        {/* Nhớ mật khẩu và Quên mật khẩu */}
        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
            />
            <span className="text-gray-700">Nhớ mật khẩu</span>
          </label>
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
        <button
          onClick={() => {
            navigate("/accounts/register");
          }}
          className="cursor-pointer text-green-600 hover:underline font-medium"
        >
          Đăng ký
        </button>
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
      <GoogleAuthButton />
    </form>
  );
}
