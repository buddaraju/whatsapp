import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../../assets/images/logo-ct-dark.png";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/pages/authentication/sign-in");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-sm fixed-top"
      style={{ backgroundColor: "rgb(25 135 84)" }}
    >
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <img src={logo} alt="Logo" width="40" height="40" className="me-2" />
        </div>

        <button className="btn btn-outline-light" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
