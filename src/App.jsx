import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DocumentsTable from "./components/DocumentsTable";
import Signup from "./components/SignupPage";
import LoginPages from "./components/LoginPage";
import UploadDocument from "./pages/UploadDocument";
import Setting from "./pages/Setting";
import VerifyDocument from "./components/VerifyDocument";
import AuthLayout from "./layout/AuthLayout";
import AppLayout from "./layout/AppLayout";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import OtpVerification from "./pages/OtpVerification";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const router = createBrowserRouter(
    isLoggedIn
      ? [
          {
            path: "/",
            element: <AppLayout />,
            children: [
              { index: true, element: <DocumentsTable /> },
              { path: "upload", element: <UploadDocument /> },
              { path: "setting", element: <Setting /> },
            ],
          },
          { path: "*", element: <NotFound /> },
        ]
      : [
          {
            path: "/",
            element: <AuthLayout />,
            children: [
              { index: true, element: <LoginPages /> },
              { path: "signUp", element: <Signup /> },
              { path: "verifydocument", element: <VerifyDocument /> },
              { path: "forgetPassword", element: <ForgotPassword /> },
              { path: "resetPassword", element: <ResetPassword /> },
              { path: "otpVerification", element: <OtpVerification /> },
            ],
          },
          { path: "*", element: <NotFound /> },
        ]
  );

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
