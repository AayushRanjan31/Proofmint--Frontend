import NavbarPage from './Navbar';
import {Outlet} from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div>
      <NavbarPage/>
      <Outlet/>

    </div>
  );
};

export default AuthLayout;
