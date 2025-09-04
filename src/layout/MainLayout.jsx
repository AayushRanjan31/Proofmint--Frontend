import NavbarPage from "./Navbar"
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
const MainLayout = () => {
  return (
    <div>
        <NavbarPage/>
        {/* <Sidebar/> */}
        <Outlet/>
        
    </div>
  )
}

export default MainLayout