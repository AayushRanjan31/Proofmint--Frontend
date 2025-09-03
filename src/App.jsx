import {ToastContainer} from 'react-toastify';
import Dashboard from './pages/Dashboard';
import Navbar from './layout/Navbar';

function App() {
// const router = createBrowserRouter([
//   {}
// ])
  return (
    <div>
      <ToastContainer position="top-right" autoClose= "3000" />
      <Navbar/> 
      <Dashboard />
    </div>
  );
}

export default App;
