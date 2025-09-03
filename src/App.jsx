// import {ToastContainer} from 'react-toastify';
import Dashboard from './pages/Dashboard';
import Navbar from './layout/Navbar';
import { ToastContainer } from 'react-toastify';
import Sidebar from './layout/Sidebar';

function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose= "3000" />
      <Navbar/>
      <Sidebar />
    </div>
  );
}

export default App;
