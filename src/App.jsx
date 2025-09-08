import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import UploadDocument from './pages/UploadDocument';
import Settings from './pages/Settings';
import VerifyDocument from './pages/VerifyDocument';
import AuthLayout from './layout/AuthLayout';
import AppLayout from './layout/AppLayout';
import NotFound from './pages/NotFound';
import {checkAuth} from './redux/slices/authSlice';
import ManageUser from './pages/ManageUser';
import ForgotPasswordPage from './components/ForgetPassword';
import ResetPasswordPage from './components/ResetPassword';
import OtpVerificationPage from './components/OtpVerification';
import {ToastContainer} from 'react-toastify';
import Dashboard from './pages/Dashboard';
import UploadStamp from './components/UploadStamp';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

const App=()=> {
  const dispatch = useDispatch();
  const {isLoggedIn, isAdmin} = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  const router = createBrowserRouter(
        isLoggedIn ?
            [
              {
                path: '/',
                element: <AppLayout />,
                children: [
                  {path: '/', element: <Dashboard />},
                  {path: 'upload', element: <UploadDocument />},
                  {path: 'setting', element: <Settings />},
                  {path: 'stamp', element: <UploadStamp />},
                  ...(isAdmin ?
                              [
                                {
                                  path: 'manageUser',
                                  element: <ManageUser />,
                                },
                              ] :
                              []),
                ],
              },
              {path: '*', element: <NotFound />},
            ] :
            [
              {
                path: '/',
                element: <AuthLayout />,
                children: [
                  {index: true, element: <LoginPage />},
                  {path: 'signUp', element: <SignupPage />},
                  {
                    path: 'verifydocument',
                    element: <VerifyDocument />,
                  },
                  {
                    path: 'forgetPassword',
                    element: <ForgotPasswordPage />,
                  },
                  {
                    path: 'resetPassword',
                    element: <ResetPasswordPage />,
                  },
                  {
                    path: 'otpVerification',
                    element: <OtpVerificationPage />,
                  },
                ],
              },
              {path: '*', element: <NotFound />},
            ],
  );

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
