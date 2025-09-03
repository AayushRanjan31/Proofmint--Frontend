import NavbarPage from "./Navbar"
import { Outlet } from "react-router-dom"
const OutletPage = () => {
  return (
    <div>
        <NavbarPage/>
        <Outlet/>
        
    </div>
  )
}

export default OutletPage