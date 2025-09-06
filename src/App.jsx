import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
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
import CertificateWithStamp from "./components/UploadStamp";
import { checkAuth } from "./redux/slices/authSlice";
import ManageUser from "./components/ManageUser";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, isAuthChecked } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth()); 
  }, [dispatch]);

  if (!isAuthChecked) {
    return <div>Loading...</div>; 
  }

  const router = createBrowserRouter(
    !isLoggedIn
      ? 
       [
          {
            path: "/",
            element: <AuthLayout />,
            children: [
              { index: true, element: <LoginPages /> },
              { path: "signUp", element: <Signup /> },
              { path: "verifydocument", element: <VerifyDocument /> },
            ],
          },
          { path: "*", element: <NotFound /> },
        ]:
        [
          {
            path: "/",
            element: <AppLayout />,
            children: [
              { path: "/", element: <DocumentsTable /> },
              { path: "upload", element: <UploadDocument /> },
              { path: "setting", element: <Setting /> },
              { path: "stamp", element: <CertificateWithStamp /> },
              { path: "manageUser", element: <ManageUser />}
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
