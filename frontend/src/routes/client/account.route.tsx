import RegisterPage from "@/pages/auth/register/RegisterPage";
import LoginPage from "@/pages/auth/login/LoginPage";

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
  ],
};

export default accountRoute;
