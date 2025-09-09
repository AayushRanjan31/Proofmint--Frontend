import {useDispatch, useSelector} from 'react-redux';
import {setLoggedIn} from '../redux/slices/authSlice';
import {logout} from '../utils/proofMintApi';
import {useNavigate} from 'react-router-dom';
import {Avatar, Dropdown, Menu} from 'antd';
import {LogoutOutlined, UserOutlined} from '@ant-design/icons';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLoggedIn} = useSelector((state) => state.auth);
  const user = localStorage.getItem('userName');

  const handleLogout = () => {
    dispatch(setLoggedIn(false));
    logout();
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
    navigate('/');
  };

  // Dropdown menu for user
  const menu = (
    <Menu>
      <Menu.Item key="username" disabled className='text-black'>
        {user}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" danger onClick={handleLogout} icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <nav
      className="fixed top-0 left-0 w-full h-17 shadow-md z-50 flex items-center px-3 md:px-6"
      style={{background: 'var(--navbar-bg)'}}
    >
      {/* Logo */}
      <div className="flex-1 flex items-center justify-center md:justify-start">
        <img src="/icon.png" alt="Logo" className="h-10" />
        <span className="ml-2 text-[var(--text-color)] text-xl md:text-2xl font-bold">
          Proofmint
        </span>
      </div>

      {/* User Dropdown */}
      {isLoggedIn && (
        <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
          <Avatar
            size={32}
            icon={<UserOutlined />}
            style={{cursor: 'pointer', backgroundColor: '#000000'}}
          />
        </Dropdown>
      )}
    </nav>
  );
};

export default Navbar;
