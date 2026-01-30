import RegisterPage from "@/views/auth/register/RegisterPage";
import LoginPage from "@/views/auth/login/LoginPage";
import OtpPage from "@/views/auth/otp/OtpPage";

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
