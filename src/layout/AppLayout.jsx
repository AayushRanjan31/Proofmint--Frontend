import NavbarPage from './Navbar';
import {Outlet} from 'react-router-dom';
import Sidebar from './Sidebar';

const AppLayout = () => {
  return (
    <div className="flex flex-col">
      <NavbarPage />
      <div className="mt-16">
        <Sidebar />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
