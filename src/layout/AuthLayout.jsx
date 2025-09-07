import Footer from './Footer';
import NavbarPage from './Navbar';
import { Outlet, useLocation } from 'react-router-dom';

const AuthLayout = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarPage />
      <main className="mt-16">
        <Outlet />
      </main>
      {location.pathname !== '/forgetPassword' && <Footer />}
    </div>
  );
};

export default AuthLayout;

