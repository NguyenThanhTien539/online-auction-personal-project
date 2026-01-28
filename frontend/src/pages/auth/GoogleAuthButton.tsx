/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function GoogleAuthButton() {
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleSuccessGoogleLogin = async (credentialResponse: any) => {
    console.log("Google Credential Response:", credentialResponse);
    try {
      const finalData = {
        credential: credentialResponse.credential,
        rememberPassword: true,
      };
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/accounts/google-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(finalData),
        },
      );

      const data = await response.json();

      if (data.code === "success") {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      toast.error("Đã xảy ra lỗi khi đăng nhập bằng Google");
    }
  };

  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <div ref={googleButtonRef} className="hidden">
          <GoogleLogin
            onSuccess={handleSuccessGoogleLogin}
            onError={() => {
              console.log("Login Failed");
              toast.error("Đăng nhập bằng Google thất bại");
            }}
          />
        </div>
      </GoogleOAuthProvider>

      {/* Custom Google Icon Button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => {
            const googleBtn = googleButtonRef.current?.querySelector(
              'div[role="button"]',
            ) as HTMLElement;
            if (googleBtn) googleBtn.click();
          }}
          className="w-12 h-12 flex items-center justify-center bg-white border-2 border-gray-300 hover:border-gray-400 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <svg
            className="cursor-pointer w-6 h-6"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
