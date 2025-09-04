import { useState, useEffect } from "react";
import { GrHomeRounded } from "react-icons/gr";
import { FiUpload } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

import { NavLink } from "react-router-dom";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 767);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Hamburger button - shows ONLY on mobile (<=450px) */}
            {isMobile && (
                <button
                    className="fixed z-50 p-1 mx-2 rounded top-8 text-white bg-dark"
                    onClick={toggleSidebar}
                >
                    <GiHamburgerMenu size={22} />
                </button>
            )}

            {(isMobile ? isOpen : true) && (
                <div
                    className={`position-fixed max-[576px]:mt-[90px] min-[576px]:mt-[70px] top-0 vh-100 p-3 bg-[var(--sidebar-bg)] transition-all`}
                    style={{
                        width: "280px",
                        left: isMobile ? (isOpen ? "0" : "-250px") : "0",
                        zIndex: 101,
                        transition: "left 0.3s",
                    }}
                >
                    <div className="py-12 flex flex-col gap-4 ">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `!no-underline w-full py-3 rounded-xl flex gap-2 justify-center items-center text-2xl font-bold text-white ${
                                    isActive && "bg-[#111c2e]"
                                }`
                            }
                        >
                                <GrHomeRounded />
                                <span>Dashboard</span>
                        </NavLink>
                         <NavLink
                            to="/upload"
                            className={({ isActive }) =>
                                `!no-underline w-full py-3 rounded-xl flex gap-2 justify-center items-center text-2xl font-bold text-white ${
                                    isActive && "bg-[#111c2e]"
                                }`
                            }
                        >
                                <FiUpload />
                                <span>Upload a File</span>
                        </NavLink>
                          <NavLink
                            to="/setting"
                            className={({ isActive }) =>
                                `!no-underline w-full py-3 rounded-xl flex gap-2 justify-center items-center text-2xl font-bold text-white ${
                                    isActive && "bg-[#111c2e]"
                                }`
                            }
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
                    className="top-0 opacity-50 position-fixed start-0 w-100 h-100 bg-dark"
                    onClick={toggleSidebar}
                    style={{ zIndex: 100 }}
                ></div>
            )}
        </>
    );
}
export default Sidebar;
