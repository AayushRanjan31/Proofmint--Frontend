import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import UploadDocument from "./pages/UploadDocument";
import Setting from "./pages/Setting";
import VerifyDocument from "./components/VerifyDocument";
import AuthLayout from "./layout/AuthLayout";
import AppLayout from "./layout/AppLayout";
import NotFound from "./pages/NotFound";
import CertificateWithStamp from "./components/UploadStamp";
import { checkAuth } from "./redux/slices/authSlice";
import ManageUser from "./components/ManageUser";
import ForgotPasswordPage from "./pages/ForgetPassword";
import ResetPasswordPage from "./pages/ResetPassword";
import OtpVerificationPage from "./pages/OtpVerification";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";

function App() {
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);


  const router = createBrowserRouter(
  isLoggedIn
    ? [
        {
          path: "/",
          element: <AppLayout />,
          children: [
            { path: "/", element: <Dashboard /> },
            { path: "upload", element: <UploadDocument /> },
            { path: "setting", element: <Setting /> },
            { path: "stamp", element: <CertificateWithStamp /> },
            { path: "manageUser", element: <ManageUser /> },
          ],
        },
        { path: "*", element: <NotFound /> },
      ]
    : [
        {
          path: "/",
          element: <AuthLayout />,
          children: [
            { index: true, element: <LoginPage /> },
            { path: "signUp", element: <Signup /> },
            { path: "verifydocument", element: <VerifyDocument /> },
            { path:"forgetPassword",element:<ForgotPasswordPage/>},
            { path:"resetPassword",element:<ResetPasswordPage/>},
            { path:"otpVerification",element:<OtpVerificationPage/>}
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
