import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import logo from "../assets/logo.png";
import "../styles/navbarCustom.css";
import { Link, useLocation } from "react-router-dom";

function NavbarPage() {
    const location = useLocation();
  return (
    <Navbar
      expand="sm"
      className={`py-2 custom-navbar shadow-md`}
    >
      <Container fluid className="d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Navbar.Brand
          href="#home"
          className="flex flex-grow-1 flex-md-grow-0"
        >
          <img 
            src={logo}
            alt="Logo"
            style={{ height: "50px" }}
          />
        </Navbar.Brand>

        {/* Buttons */}
          {(location.pathname === "/" || location.pathname === "/signUp") ? (
             <Link to={'/verifydocument'}><Button variant="outline-primary">Verify Document</Button></Link> 
      ):  <div className="gap-2 md:flex">
        <div className="hidden md:flex"><Link to={'/signUp'}><Button variant="outline-primary">Sign Up</Button></Link></div>
         <Link to={'/'}><Button variant="outline-primary">Login </Button></Link> </div>}
      </Container>
    </Navbar>
  );
}

export default NavbarPage;
