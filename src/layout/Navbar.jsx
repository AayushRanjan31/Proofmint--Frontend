import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import '../styles/navbarCustom.css';
import {FaUserCircle} from 'react-icons/fa';
import {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setLoggedIn} from '../redux/slices/authSlice';
import {logout} from '../utils/proofMintApi';
import {useNavigate} from 'react-router-dom';
import { clearUser } from "../redux/slices/userDetails"; 

function NavbarPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [clickUser, setClickUser] = useState(false);
  const dropdownRef = useRef(null);
  const {isLoggedIn} = useSelector((state) => state.auth);
  const user=localStorage.getItem("userName")

  const handleLogout = () => {
    dispatch(setLoggedIn(false));
    dispatch(clearUser()); 
    setClickUser(false);
    logout();
    localStorage.removeItem("userName")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("token")
     navigate('/');
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
    <Navbar expand="sm" className="custom-navbar shadow border-b-1 border-gray-100">
      <Container fluid className="flex justify-between items-center">
        {/* Logo */}
        <Navbar.Brand className={`flex gap-2 justify-center items-center ${isLoggedIn && 'ml-[26%] md:ml-[2px] flex justify-center items-center gap-2' } `}>
          <img src="/icon.png" alt="Logo" style={{height: '40px'}} />
          <p className='text-[var(--text-color)] text-2xl font-bold mt-3'>Proofmint</p>
        </Navbar.Brand>

        {/* Buttons */}
        {isLoggedIn && (
          <div className="relative" ref={dropdownRef}>
            <FaUserCircle
              size={30}
              className="cursor-pointer text-[var(--text-color)]"
              onClick={() => setClickUser(!clickUser)}
            />
            {clickUser && (
              <div className="absolute right-0 mt-2 w-40 bg-[var(--component-bg)] shadow-lg rounded-md p-2 z-50">
                <p className="px-2 py-1 font-medium text-[var(--text-color)]">{user}</p>
                <hr />
                <button
                  onClick={()=> handleLogout()}
                  className="w-full text-left px-2 py-1 text-red-600 hover:bg-gray-100 rounded-md"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) }
      </Container>
    </Navbar>
  );
}

export default NavbarPage;
