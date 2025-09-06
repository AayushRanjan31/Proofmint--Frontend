import Footer from './Footer';
import NavbarPage from './Navbar';
import {Outlet, useLocation} from 'react-router-dom';

const AuthLayout = () => {
   const location = useLocation();
  return (
    <div>
      <NavbarPage/>
      <Outlet/>
     {location.pathname !== '/forgetPassword' && <Footer/>
        }      
    </div>
  );
};

export default AuthLayout;
