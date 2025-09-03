// import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Dashboard from './pages/Dashboard';


function App() {
// const router = createBrowserRouter([
//   {}
// ])
  return (
    <>
      <ToastContainer position="top-right" autoClose= "3000" />
      {/* <RouterProvider router={router} /> */}
      <Dashboard />
    </>
  );
}

export default App;
