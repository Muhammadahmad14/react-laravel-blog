import GuestLayout from "../../layouts/GuestLayout";
import {
  Login,
  Register,
  GoogleCallback,
  ForgotPassword,
  ConfirmPassword,
  ConfirmOtp,
} from "../../pages/Auth/index";
const PublicRoutes = [
  {
    element: <GuestLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/google-callback", element: <GoogleCallback /> },
      { path: "/forget-password", element: <ForgotPassword /> },
      { path: "/confirm-password", element: <ConfirmPassword /> },
      { path: "/confirm-otp", element: <ConfirmOtp /> },
    ],
  },
];

export default PublicRoutes;
