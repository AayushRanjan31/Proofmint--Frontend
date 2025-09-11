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
    localStorage.clear();
    navigate('/');
  };

  const menu = (
    <Menu>
      <Menu.Item key="username" disabled>
        {user}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" danger onClick={handleLogout} icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <nav className="fixed top-0 left-0 w-full shadow-md z-50 flex items-center px-4 md:px-6 bg-white">
      {/* Logo */}
      <div className="flex-1 flex items-center">
        <img src="/icon.png" alt="Logo" className="h-10" />
        <span className="ml-2 text-xl md:text-2xl font-bold text-gray-800">
          Proofmint
        </span>
      </div>

      {/* User Dropdown */}
      {isLoggedIn && (
        <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
          <Avatar
            size={32}
            icon={<UserOutlined />}
            style={{cursor: 'pointer', backgroundColor: '#000'}}
          />
        </Dropdown>
      )}
    </nav>
  );
};

export default Navbar;
