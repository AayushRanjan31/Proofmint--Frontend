import {Button} from 'antd';
import {Link, useLocation} from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const showVerify = ['/', '/sign-up'].includes(location.pathname);

  return (
    <footer className="w-full p-[15px] mt-[50px] bg-[#ececec]">
      <div className="flex justify-end">
        {showVerify ? (
          <Link to="/verify-document">
            <Button type="primary" ghost>
              Verify Document
            </Button>
          </Link>
        ) : (
          <div className="flex gap-2">
            <Link to="/">
              <Button type="primary" ghost>
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
