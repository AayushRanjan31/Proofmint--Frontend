import Footer from './Footer';
import NavbarPage from './Navbar';
import {Outlet} from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div>
      <NavbarPage/>
      <Outlet/>
      <Footer/>
    </div>
  );
};

export default AuthLayout;
