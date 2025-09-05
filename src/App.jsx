import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import DocumentsTable from "./components/DocumentsTable";
import Signup from './components/SignupPage';
import LoginPages from './components/LoginPage';
import UploadDocument from "./pages/UploadDocument";
import Setting from "./pages/Setting";
import VerifyDocument from "./components/VerifyDocument";

import AuthLayout from "./layout/AuthLayout";
import AppLayout from "./layout/AppLayout";

function App() {
 const { isLoggedIn} = useSelector((state) => state.auth);
  const router = createBrowserRouter(
    isLoggedIn
      ? 
       [
          {
            path: "/",           
            element: <AppLayout />,
            children: [
              { path: "/", element: <DocumentsTable /> },
              { path: "/upload", element: <UploadDocument /> },
              { path: "setting", element: <Setting /> },
            ],
          },
        ]
        :[
          {
            path: "/",              
            element: <AuthLayout />,
            children: [
              { index: true, element: <LoginPages /> },
              { path: "signUp", element: <Signup /> },
              { path: "verifydocument", element: <VerifyDocument /> },
            ],
          },
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
