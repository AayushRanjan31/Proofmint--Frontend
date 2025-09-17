import Footer from '../components/Footer';
import NavbarPage from '../components/Navbar';
import {Outlet, useLocation} from 'react-router-dom';

const AuthLayout = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarPage />
      <main className="mt-16">
        <Outlet />
      </main>
      {location.pathname !== '/forgot-password' && <Footer />}
    </div>
  );
};

export default AuthLayout;
