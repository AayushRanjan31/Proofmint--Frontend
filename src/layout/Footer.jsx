import Button from "react-bootstrap/esm/Button";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  return (
    <div className="w-full p-3 mt-10 bg-[#ececec]">
      <div className="flex justify-end">
        {location.pathname === "/" || location.pathname === "/signUp" ? (
          <Link to={"/verifydocument"}>
            <Button variant="outline-primary">Verify Document</Button>
          </Link>
        ) : (
          <div className="gap-2 md:flex">
            <div className="hidden md:flex">
              <Link to={"/signUp"}>
                <Button variant="outline-primary">Sign Up</Button>
              </Link>
            </div>
            <Link to={"/"}>
              <Button variant="outline-primary">Login</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;
