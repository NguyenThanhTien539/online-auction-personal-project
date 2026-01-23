import RegisterPage from "@/pages/auth/register/RegisterPage";
import LoginPage from "@/pages/auth/login/LoginPage";
import OtpPage from "@/pages/auth/otp/OtpPage";

const accountRoute = {
  path: "/accounts",
  children: [
    {
      path: "register",
      element: <RegisterPage />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "verify-otp",
      element: <OtpPage />,
    },
  ],
};

export default accountRoute;
