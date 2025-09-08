import Button from 'react-bootstrap/esm/Button';
import {Link, useLocation} from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  return (
    <footer className="w-full p-3 mt-10 bg-[#ececec]">
      <div className="flex justify-end">
        {location.pathname === '/' || location.pathname === '/signUp' ? (
          <Link to={'/verifydocument'}>
            <Button variant="outline-primary">Verify Document</Button>
          </Link>
        ) : (
          <div className="gap-2 md:flex">
            <Link to={'/'}>
              <Button variant="outline-primary">Login</Button>
            </Link>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
