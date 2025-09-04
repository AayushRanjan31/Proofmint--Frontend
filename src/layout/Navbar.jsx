import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import logo from "../assets/logo.png";
import "../css/navbarCustom.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function NavbarPage() {
  const {theme}=useSelector(state=>state.Settings)
  return (
    <Navbar
      expand="sm"
      className={`py-2 custom-navbar`}
    >
      <Container fluid className="d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Navbar.Brand
          href="#home"
          className="d-flex justify-content-center flex-grow-1 flex-md-grow-0"
        >
          <img
            src={logo}
            alt="Logo"
            style={{ height: "50px" }}
          />
        </Navbar.Brand>

        {/* Buttons */}
        <div className="gap-2 d-none d-md-flex ">
         <Link to={'/signUp'}><Button variant="outline-primary">Sign Up</Button></Link>
         <Link to={'/login'}><Button variant="outline-primary">Login </Button></Link>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavbarPage;
