import '../styles/navbarCustom.css';
import {FaUserCircle} from 'react-icons/fa';
import {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setLoggedIn} from '../redux/slices/authSlice';
import {logout} from '../utils/proofMintApi';
import {useNavigate} from 'react-router-dom';
import {clearUser} from '../redux/slices/userDetails';

function NavbarPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clickUser, setClickUser] = useState(false);
  const dropdownRef = useRef(null);
  const {isLoggedIn} = useSelector((state) => state.auth);
  const user = localStorage.getItem('userName');

  const handleLogout = () => {
    dispatch(setLoggedIn(false));
    dispatch(clearUser());
    setClickUser(false);
    logout();
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setClickUser(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full h-17 bg-[var(--navbar-bg)] shadow-md z-50 flex items-center px-3 md:px-6">
      {/* Logo */}
      <div className="flex-1 flex items-center justify-center md:justify-start">
        <img src="/icon.png" alt="Logo" className="h-10" />
        <span className="ml-2 text-[var(--text-color)] text-xl md:text-2xl font-bold">
          Proofmint
        </span>
      </div>

      {/* User Icon */}
      {isLoggedIn && (
        <div className="relative" ref={dropdownRef}>
          <FaUserCircle
            size={28}
            className="cursor-pointer text-[var(--text-color)]"
            onClick={() => setClickUser(!clickUser)}
          />
          {clickUser && (
            <div className="absolute right-0 mt-2 w-44 bg-[var(--component-bg)] shadow-lg rounded-md p-2 z-50">
              <p className="px-2 py-1 font-medium text-[var(--text-color)] truncate">{user}</p>
              <hr className="my-1" />
              <button
                onClick={handleLogout}
                className="w-full text-left px-2 py-1 text-red-600 hover:bg-gray-100 rounded-md"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavbarPage;
