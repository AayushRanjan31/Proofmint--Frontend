import Navbar from '../components/Navbar';
import {Outlet} from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const AppLayout = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
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
