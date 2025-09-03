import { ToastContainer } from "react-toastify";
import Navbar from './layout/Navbar';

function App() {
  return (
    <div>
     <ToastContainer position="top-right" autoClose= "3000" />
     <Navbar/>
    </div>
  )
}

export default App
