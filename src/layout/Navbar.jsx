import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import logo from '../assets/logo.png';
import '../styles/navbarCustom.css';
import {Link, useLocation} from 'react-router-dom';
import {FaUserCircle} from 'react-icons/fa';
import {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setLoggedIn} from '../redux/slices/authSlice';

function NavbarPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector((state) => state.auth);
  const [clickUser, setClickUser] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(setLoggedIn(false));
    setClickUser(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setClickUser(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Navbar expand="sm" className="custom-navbar shadow-md">
      <Container fluid className="flex justify-between items-center">
        {/* Logo */}
        <Navbar.Brand className={`${isLoggedIn && 'ml-[30%] md:ml-[2px]' } `}>
          <img src={logo} alt="Logo" style={{height: '50px'}} />
        </Navbar.Brand>

        {/* Buttons */}
        {isLoggedIn ? (
          <div className="relative" ref={dropdownRef}>
            <FaUserCircle
              size={30}
              className="cursor-pointer text-[var(--text-color)]"
              onClick={() => setClickUser(!clickUser)}
            />
            {clickUser && (
              <div className="absolute right-0 mt-2 w-40 bg-[var(--component-bg)] text-[var(--text-color)] shadow-lg rounded-md p-2 z-50">
                <p className="px-2 py-1 font-medium">Tarun Kumar</p>
                <hr />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-2 py-1 text-red-600 hover:bg-gray-100 rounded-md"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            {location.pathname === '/' || location.pathname === '/signUp' ? (
              <Link to={'/verifydocument'}>
                <Button variant="outline-primary">Verify Document</Button>
              </Link>
            ) : (
              <div className="gap-2 md:flex">
                <div className="hidden md:flex">
                  <Link to={'/signUp'}>
                    <Button variant="outline-primary">Sign Up</Button>
                  </Link>
                </div>
                <Link to={'/'}>
                  <Button variant="outline-primary">Login</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </Container>
    </Navbar>
  );
}

export default NavbarPage;
