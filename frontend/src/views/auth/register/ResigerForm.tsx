/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import { InputField } from "@/common/InputFiled";
import JustValidate from "just-validate";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import GoogleAuthButton from "../GoogleAuthButton";
import ReCAPTCHA from "react-google-recaptcha";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const validator = new JustValidate("#register-form");
    validator
      .addField(
        "#fullName",
        [
          { rule: "required", errorMessage: "Họ và tên không được để trống" },
          {
            rule: "minLength",
            value: 3,
            errorMessage: "Họ và tên phải có ít nhất 3 ký tự",
          },
          {
            rule: "maxLength",
            value: 50,
            errorMessage: "Họ và tên không được vượt quá 50 ký tự",
          },
        ],
        {
          errorContainer: "#fullNameError",
        },
      )
      .addField(
        "#email",
        [
          { rule: "required", errorMessage: "Vui lòng nhập email!" },
          { rule: "email", errorMessage: "Email không đúng định dạng!" },
        ],
        { errorContainer: "#emailError" },
      )
      .addField(
        "#password",
        [
          { rule: "required", errorMessage: "Vui lòng nhập mật khẩu!" },
          {
            validator: (value: string) => value.length >= 8,
            errorMessage: "Mật khẩu có ít nhất 8 kí tự",
          },
          {
            validator: (value: string) => /[A-Z]/.test(value),
            errorMessage: "Mật khẩu phải chứa ít nhất một chữ cái in hoa!",
          },
          {
            validator: (value: string) => /[a-z]/.test(value),
            errorMessage: "Mật khẩu phải chứa ít nhất một chữ cái thường!",
          },
          {
            validator: (value: string) => /\d/.test(value),
            errorMessage: "Mật khẩu phải chứa ít nhất một chữ số!",
          },
          {
            validator: (value: string) => /[@$!%*?&]/.test(value),
            errorMessage: "Mật khẩu phải chứa ít nhất một ký tự đặc biệt!",
          },
        ],
        {
          errorContainer: "#passwordError",
        },
      )
      .addField(
        "#confirmPassword",
        [
          { rule: "required", errorMessage: "Vui lòng nhập lại mật khẩu!" },
          {
            validator: (value: string) => {
              const password = (
                document.getElementById("password") as HTMLInputElement
              )?.value;
              return value === password;
            },
            errorMessage: "Mật khẩu không khớp!",
          },
        ],
        {
          errorContainer: "#confirmPasswordError",
        },
      )
      .addField(
        "#agree",
        [{ rule: "required", errorMessage: "Bạn phải đồng ý với điều khoản!" }],
        { errorContainer: "#agreeError" },
      )
      .addField(
        "#recaptcha",
        [
          {
            validator: () => {
              return recaptchaValue !== null && recaptchaValue !== "";
            },
            errorMessage: "Vui lòng xác minh bạn không phải robot!",
          },
        ],
        { errorContainer: "#recaptchaError" },
      )
      .onSuccess((event: any) => {
        const email = event.target.email.value;
        const fullName = event.target.fullName.value;
        const password = event.target.password.value;

        const finalData = {
          email: email,
          full_name: fullName,
          password: password,
          recaptcha: recaptchaValue,
        };

        console.log("Form submission - finalData:", finalData);
        console.log("reCAPTCHA value before submit:", recaptchaValue);

        fetch(`${import.meta.env.VITE_API_URL}/api/accounts/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(finalData),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.code == "success") {
              toast.success(data.message);

              // Lưu thời gian hết hạn OTP vào localStorage
              if (data.data?.expireTime) {
                localStorage.setItem(
                  "otp_expire_time",
                  data.data.expireTime.toString(),
                );
              }

              navigate("/accounts/verify-otp?type=register&email=" + email);
            } else if (data.code == "error") {
              toast.error(data.message);
              // Reset reCAPTCHA khi có lỗi
              recaptchaRef.current?.reset();
              setRecaptchaValue(null);
            } else if (data.code == "otp_exist") {
              toast.error(data.message);
              // Reset reCAPTCHA khi có lỗi
              recaptchaRef.current?.reset();
              setRecaptchaValue(null);
            } else {
              toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau!");
              // Reset reCAPTCHA khi có lỗi
              recaptchaRef.current?.reset();
              setRecaptchaValue(null);
            }
          })
          .catch(() => {
            toast.error("Lỗi kết nối! Vui lòng thử lại sau.");
            // Reset reCAPTCHA khi có lỗi
            recaptchaRef.current?.reset();
            setRecaptchaValue(null);
          });
      });
  }, [navigate, recaptchaValue]);

  return (
    <>
      <form
        id="register-form"
        className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-xl border border-emerald-100
                    flex flex-col space-y-6"
      >
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-gray-800">
            Đăng ký tài khoản cá nhân
          </h1>
        </div>
        {/* Form Fields */}
        <div className="space-y-4">
          {/* Họ và tên */}
          <div>
            <InputField
              label="Họ và tên"
              id="fullName"
              placeholder="Nhập họ và tên"
            />
            <div
              id="fullNameError"
              className="text-xs text-red-500 mt-1 font-medium"
            ></div>
          </div>
          {/* Email */}
          <div>
            <InputField label="Email" id="email" placeholder="Nhập email" />
            <div
              id="emailError"
              className="text-xs text-red-500 mt-1 font-medium"
            ></div>
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
                className="absolute right-4 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div
              id="passwordError"
              className="text-xs text-red-500 mt-1 font-medium"
            ></div>
          </div>

          {/* Nhập lại mật khẩu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nhập lại mật khẩu
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-3 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div
              id="confirmPasswordError"
              className="text-xs text-red-500 mt-1 font-medium"
            ></div>
          </div>

          <div className="flex flex-col">
            {/* Checkbox + label */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="agree"
                name="agree"
                className="mt-1 w-4 h-4 text-green-600 rounded focus:ring-green-500"
              />
              <label htmlFor="agree" className="text-sm text-gray-600">
                Tôi cam kết tuân thủ quyền và trách nhiệm của người tham gia đấu
                giá, chính sách và mọi{" "}
                <a
                  href="#"
                  className="text-green-600 hover:underline font-medium"
                >
                  Điều khoản dịch vụ
                </a>{" "}
                tại website đấu giá trực tuyến vna.vn
              </label>
            </div>

            {/* Error */}
            <div
              id="agreeError"
              className="mt-1 text-xs text-red-500 font-medium"
            />
          </div>

          {/* reCAPTCHA */}
          <div>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={(value) => setRecaptchaValue(value)}
              onExpired={() => setRecaptchaValue(null)}
            />
            {/* Hidden input for validation */}
            <input
              type="hidden"
              id="recaptcha"
              name="recaptcha"
              value={recaptchaValue || ""}
              onChange={() => {}} // Prevent React warning
            />
            <div
              id="recaptchaError"
              className="text-xs text-red-500 mt-1 font-medium text-center"
            ></div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="cursor-pointer w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-full transition-colors shadow-lg hover:shadow-xl"
        >
          Tạo tài khoản
        </button>

        <div className="text-center text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <button
            onClick={() => {
              navigate("/accounts/login");
            }}
            className="cursor-pointer text-green-600 hover:underline font-medium"
          >
            Đăng nhập
          </button>
        </div>

        {/* Divider */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-400">
              Hoặc tiếp tục với
            </span>
          </div>
        </div>
        {/* Social Buttons */}
        <GoogleAuthButton />
      </form>
    </>
  );
}
