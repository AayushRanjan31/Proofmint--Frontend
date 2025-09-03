import { ToastContainer } from "react-toastify";
import Dashboard from './pages/Dashboard';
import Signup from './components/SignupPage';
import Login from './components/LoginPage';
import IssuedCertificate from './components/IssuedCertificate';
import CertificateWithQR from './components/UploadStamp';
import OutletPage from "./layout/Outlet";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose= "3000" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OutletPage/>}>
            <Route path="/" element={<Dashboard />}/>
            <Route path="/LogIn" element={<Login/>}/>
            <Route path="/SignUp" element={<Signup/>}/>
            <Route path="/IssuedCertificate" element={<IssuedCertificate/>}/>
            <Route path="/CertificateWithQr" element={<CertificateWithQR/>}/>
          </Route>
        </Routes>
      </BrowserRouter>   
    </>
  );
}

export default App;
