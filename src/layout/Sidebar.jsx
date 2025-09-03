import  { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { House, Upload, Gear, List } from "react-bootstrap-icons";
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
          className="position-fixed top-0 mt-[25px] ml-[10px] start-0 z-50 p-2 bg-dark text-white border rounded"
          onClick={toggleSidebar}
        >
          <List size={25} />
        </button>
      )}

      {(isMobile ? isOpen : true) && (
        <div
          className={`position-fixed max-[576px]:mt-[90px]  min-[576px]:mt-[70px] top-0 vh-100 p-3 shadow-sm bg-dark text-white transition-all`}
          style={{
            width: "250px",
            left: isMobile ? (isOpen ? "0" : "-250px") : "0",
            zIndex: 101,
            transition: "left 0.3s",
          }}
        >
          <Nav defaultActiveKey="/dashboard" className="flex-column gap-2 py-4">
            <Nav.Link href="/dashboard" className="d-flex align-items-center fs-5 text-white">
              <House className="me-2" /> Dashboard
            </Nav.Link>
            <Nav.Link href="/upload" className="d-flex align-items-center fs-5 text-white">
              <Upload className="me-2" /> Upload a File
            </Nav.Link>
            <Nav.Link href="/settings" className="d-flex align-items-center fs-5 text-white">
              <Gear className="me-2" /> Settings
            </Nav.Link>
          </Nav>

          {/* Show buttons only on mobile inside open sidebar */}
          {isMobile && isOpen && (
            <>
              <Button variant="primary" className="mt-2 w-100">
                Sign Up
              </Button>
              <Button variant="primary" className="mt-2 w-100">
                Login
              </Button>
            </>
          )}
        </div>
      )}

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50"
          onClick={toggleSidebar}
          style={{ zIndex: 100 }}
        ></div>
      )}
    </>
  );
}
export default Sidebar;
