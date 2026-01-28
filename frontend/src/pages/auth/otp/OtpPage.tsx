import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const OTP_CODE_EXPIRATION_SECONDS = 20;

export default function OtpPage() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isVerifying, setIsVerifying] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "register";
  const canResend = countdown === 0;

  // Verify OTP token on component mount
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/accounts/verify-otp-token`,
          {
            method: "GET",
            credentials: "include", // Important: send cookies
          },
        );

        const data = await response.json();

        if (data.code === "success") {
          setUserEmail(data.data.email);
          setIsVerifying(false);

          // Tính toán countdown dựa trên thời gian hết hạn đã lưu
          const otpExpireTime = localStorage.getItem("otp_expire_time");
          if (otpExpireTime) {
            const expireTimestamp = parseInt(otpExpireTime);
            const currentTime = Date.now();
            const remainingSeconds = Math.max(
              0,
              Math.floor((expireTimestamp - currentTime) / 1000),
            );
            setCountdown(remainingSeconds);
          } else {
            setCountdown(0);
          }

          inputRefs.current[0]?.focus();
        } else {
          toast.error(`${data.message}. Vui lòng đăng ký lại.`);
          localStorage.removeItem("otp_expire_time");
          navigate(-1);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        toast.error("Đã xảy ra lỗi khi xác thực token OTP.");
        localStorage.removeItem("otp_expire_time");
        navigate(-1);
      }
    };

    verifyToken();
  }, [navigate]);

  useEffect(() => {
    // Đếm ngược 30 giây
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    //auto focus to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyChange = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // address backspace and arrow keys
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);

    // Focus vào ô cuối cùng được điền
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleResendOtp = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/accounts/resend-otp-code`,
        {
          method: "GET",
          credentials: "include", // Important: send cookies
        },
      );
      const data = await response.json();

      if (data.code !== "success") {
        toast.error(
          data.message || "Không thể gửi lại mã OTP. Vui lòng thử lại!",
        );
        return;
      }

      const newExpireTime = data.data.expireTime;
      localStorage.setItem("otp_expire_time", newExpireTime.toString());
      setCountdown(OTP_CODE_EXPIRATION_SECONDS);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      toast.success("Mã OTP mới đã được gửi!");
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Không thể gửi lại mã OTP. Vui lòng thử lại!");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length === 6) {
      fetch(`${import.meta.env.VITE_API_URL}/api/accounts/verify-otp-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important: send cookies
        body: JSON.stringify({ otp_code: otpCode, type: type }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === "success") {
            toast.success(data.message);
            navigate("/accounts/login");
          } else if (data.code === "error") {
            toast.error(data.message);
          } else {
            toast.error(`${data.message}. Vui lòng đăng ký lại.`);
            localStorage.removeItem("otp_expire_time");
            navigate(-1);
          }
        })
        .catch((error) => {
          console.error("Error verifying OTP:", error);
          toast.error("Đã xảy ra lỗi khi xác thực OTP. Vui lòng thử lại.");
        });
    }
  };

  // Show loading state while verifying token
  if (isVerifying) {
    return (
      <div className="min-h-screen bg-green-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang xác thực...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-green-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-green-500 mb-2">
              Xác thực OTP
            </h2>
            <p className="text-gray-600 mb-2">
              Vui lòng nhập mã OTP gồm 6 số đã được gửi đến email:
            </p>
            <p className="text-green-600 font-semibold">{userEmail}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input */}
            <div className="flex justify-center gap-2 sm:gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyChange(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-12 sm:w-14 sm:h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
                />
              ))}
            </div>

            {/* Resend OTP */}
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Không nhận được mã?{" "}
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="cursor-pointer text-green-500 font-semibold hover:text-green-600 hover:underline"
                  >
                    Gửi lại
                  </button>
                ) : (
                  <span className="text-gray-400 font-semibold">
                    Gửi lại ({countdown}s)
                  </span>
                )}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={otp.join("").length !== 6}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Xác nhận
            </button>

            {/* Back to Login */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate("/accounts/login")}
                className="cursor-pointer text-gray-600 text-sm hover:text-green-500 hover:underline"
              >
                ← Quay lại đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
