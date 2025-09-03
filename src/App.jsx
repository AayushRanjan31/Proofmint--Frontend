import { createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Signup from './components/SignupPage';
import Login from './components/LoginPage';
import IssuedCertificate from './components/IssuedCertificate';
import CertificateWithQR from './components/UploadStamp';



function App() {
  const router = createBrowserRouter([
    {}
  ])
  return (
    <>
      <ToastContainer position="top-right" autoClose="3000" />
      {/* <Signup/> */}
      {/* <Login /> */}
      {/* <IssuedCertificate/> */}
      <CertificateWithQR/>


    </>
  )
}

export default App
