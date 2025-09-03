import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import logo from '../assets/image.png';
import '../NavbarCustom.css'; 
import { Link } from 'react-router-dom';

function NavbarPage() {
  return (
    <Navbar className="bg-blue-100 py-2 custom-navbar">
      <Container fluid className="d-flex justify-content-between px-4 align-items-center">
        {/* Brand Logo */}
        <Navbar.Brand href="#home" className="ms-2">
          <img
            src={logo}
            alt="Logo"
            className="object-contain navbar-logo"
          />
        </Navbar.Brand>

        {/* Buttons */}
        <div className="me-2 d-flex flex-row flex-sm-row flex-column-reverse gap-2">
          <Link to="/SignUp">
           <Button variant="outline-primary" className="custom-btn">
            Sign Up
          </Button></Link>
           <Link to="/Login">
          <Button variant="outline-primary" className="custom-btn">
            Login
          </Button>
          </Link>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavbarPage;
