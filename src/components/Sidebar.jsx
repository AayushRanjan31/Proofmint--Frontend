import {useState, useEffect} from 'react';
import {GrHomeRounded} from 'react-icons/gr';
import {FiUpload} from 'react-icons/fi';
import {IoSettingsOutline} from 'react-icons/io5';
import {GiHamburgerMenu} from 'react-icons/gi';
import {FaUserGear} from 'react-icons/fa6';
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Button} from 'antd';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const isAdmin = useSelector((state) => state.auth?.isAdmin);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger button - shows ONLY on mobile (<=767px) */}
      {isMobile && (
        <Button
          type="primary"
          icon={<GiHamburgerMenu />}
          onClick={toggleSidebar}
          style={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 200,
            padding: '4px 8px',
            borderRadius: '6px',
            backgroundColor: '#000000',
            color: '#ffffff',
            border: 'none',
          }}
        />
      )}

      {(isMobile ? isOpen : true) && (
        <div
          className="fixed top-0 mt-[70px] p-3 bg-[var(--sidebar-bg)] h-screen transition-all border-r border-gray-200 shadow"
          style={{
            width: '280px',
            left: isMobile ? (isOpen ? '0' : '-250px') : '0',
            zIndex: 101,
            transition: 'left 0.3s',
          }}
        >
          <div className="py-12 px-3 flex flex-col gap-4">
            <NavLink
              to="/"
              className={({isActive}) =>
                `!no-underline py-3 px-2 rounded-xl flex gap-2 items-center text-2xl font-bold text-[var(--text-color)] ${
                  isActive && 'bg-[var(--side-btn-bg)]'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <GrHomeRounded />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/upload"
              className={({isActive}) =>
                `!no-underline py-3 px-2 rounded-xl flex gap-2 items-center text-2xl font-bold text-[var(--text-color)] ${
                  isActive && 'bg-[var(--side-btn-bg)]'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <FiUpload />
              <span>Upload a File</span>
            </NavLink>

            {isAdmin && (
              <NavLink
                to="/manageUser"
                className={({isActive}) =>
                  `!no-underline py-3 px-2 rounded-xl flex gap-2 items-center text-2xl font-bold text-[var(--text-color)] ${
                    isActive && 'bg-[var(--side-btn-bg)]'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaUserGear />
                <span>Manage User</span>
              </NavLink>
            )}
            <NavLink
              to="/setting"
              className={({isActive}) =>
                `!no-underline py-3 px-2 rounded-xl flex gap-2 items-center text-2xl font-bold text-[var(--text-color)] ${
                  isActive && 'bg-[var(--side-btn-bg)]'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <IoSettingsOutline />
              <span>Settings</span>
            </NavLink>
          </div>
        </div>
      )}

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50"
          onClick={toggleSidebar}
          style={{zIndex: 100}}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
