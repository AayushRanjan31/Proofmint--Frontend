import { ToastContainer } from "react-toastify";
import Dashboard from './pages/Dashboard';
import Signup from './components/SignupPage';
import LoginPages from './components/LoginPage';
import IssuedCertificate from './components/IssuedCertificate';
import CertificateWithQR from './components/UploadStamp';
import MainLayout from "./layout/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UploadDocument from "./pages/UploadDocument";
import Setting from "./pages/Setting";
import VerifyDocument from "./components/VerifyDocument";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose= "3000" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            {/* <Route path="/" element={<Dashboard />}/> */}
            <Route path="/" element={<LoginPages/>}/>
            <Route path="/signUp" element={<Signup/>}/>
            <Route path="verifydocument" element={<VerifyDocument/>} />
            <Route path="/IssuedCertificate" element={<IssuedCertificate/>}/>
            <Route path="/CertificateWithQr" element={<CertificateWithQR/>}/>
            <Route path="/upload" element={<UploadDocument/>}/>
             <Route path="/setting" element={<Setting/>}/>
         </Route>
        </Routes>
      </BrowserRouter>   
    </>
  );
}

export default App;
