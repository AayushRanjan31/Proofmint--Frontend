import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { ToastContainer } from "react-toastify";


function App() {
const router = createBrowserRouter([
  {}
])
  return (
    <>
     <ToastContainer position="top-right" autoClose= "3000" />
     <RouterProvider router={router} />
    </>
  )
}

export default App
