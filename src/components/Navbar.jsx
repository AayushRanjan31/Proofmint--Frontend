import {useDispatch, useSelector} from 'react-redux';
import {setLoggedIn} from '../redux/slices/authSlice';
import {logout} from '../utils/proofMintApi';
import {useNavigate} from 'react-router-dom';
import {Avatar, Dropdown} from 'antd';
import {LogoutOutlined, UserOutlined} from '@ant-design/icons';
import {clearDocuments} from "../redux/slices/documentSlice"

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLoggedIn} = useSelector((state) => state.auth);
  const user = localStorage.getItem('userName');

  const handleLogout = () => {
    dispatch(setLoggedIn(false));
    logout();
    dispatch(clearDocuments())
    localStorage.clear();
    navigate('/');
  };

  const menuItems = [
    {
      key: 'username',
      label: <span className="text-black">{user}</span>,
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      danger: true,
      label: (
        <span>
          <LogoutOutlined /> Logout
        </span>
      ),
    },
  ];

  return (
    <nav
      className="fixed top-0 left-0 w-full h-17 shadow z-50 flex items-center px-3 md:px-6 border-b border-gray-200"
      style={{background: 'var(--navbar-bg)'}}
    >
      <div className="flex-1 flex items-center justify-center md:justify-start">
        <img src="/icon.png" alt="Logo" className="h-10" />
        <span className="ml-2 text-xl md:text-2xl font-bold text-gray-800">
          Proofmint
        </span>
      </div>

      {isLoggedIn && (
        <Dropdown
          menu={{
            items: menuItems,
            onClick: ({key}) => key === 'logout' && handleLogout(),
          }}
          placement="bottomRight"
          trigger={['click']}
        >
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
