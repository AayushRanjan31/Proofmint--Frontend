import {useState, useEffect} from 'react';
import {HomeOutlined, UploadOutlined, SettingOutlined, UserOutlined, MenuOutlined} from '@ant-design/icons';
import {Menu, Drawer, Button} from 'antd';
import {NavLink, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isAdmin = useSelector((state) => state.auth?.isAdmin);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    {key: '/', icon: <HomeOutlined />, label: 'Dashboard', path: '/'},
    {key: '/upload', icon: <UploadOutlined />, label: 'Upload a File', path: '/upload'},
    isAdmin && {key: '/manage-users', icon: <UserOutlined />, label: 'Manage User', path: '/manage-users'},
    {key: '/settings', icon: <SettingOutlined />, label: 'Settings', path: '/settings'},
  ].filter(Boolean);

  const menuStyle = {
    backgroundColor: 'var(--sidebar-bg)',
    borderRight: '0.8px solid #e5e7eb',
    height: '100%',
    paddingTop: '50px',
  };

  const menuItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '1.10rem',
    fontWeight: 500,
    padding: '12px 16px',
    borderRadius: '12px',
  };

  return (
    <>
      {isMobile && (
        <Button
          type="primary"
          onClick={() => setDrawerOpen(true)}
          style={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 200,
            borderRadius: '6px',
            backgroundColor: '#000',
            color: '#fff',
          }}
        >
          <MenuOutlined />
        </Button>
      )}

      {/* Mobile Drawer */}
      {isMobile ? (
        <Drawer
          title="Menu"
          placement="left"
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          styles={{body: {padding: 0}}}
        >
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            style={menuStyle}
            items={menuItems.map((item) => ({
              key: item.key,
              label: (
                <NavLink to={item.path} style={{color: 'var(--text-color)'}}>
                  <div
                    style={{
                      ...menuItemStyle,
                      color: location.pathname === item.path && 'var(--side-btn-bg)',
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                </NavLink>
              ),
            }))}
            onClick={() => setDrawerOpen(false)}
          />
        </Drawer>
      ) : (
        // Desktop sidebar
        <div
          style={{
            width: 280,
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            paddingTop: '70px',
            ...menuStyle,
            overflowY: 'auto',
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            style={menuStyle}
            items={menuItems.map((item) => ({
              key: item.key,
              label: (
                <NavLink to={item.path} style={{color: 'var(--text-color)'}}>
                  <div
                    style={{
                      ...menuItemStyle,
                      color: location.pathname === item.path && 'var(--side-btn-bg)',
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                </NavLink>
              ),
            }))}
          />
        </div>
      )}
    </>
  );
};

export default Sidebar;
