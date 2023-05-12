import React from 'react'
import { Link ,useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast"


const Header = () => {
  const navigate=useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem("token")
    navigate("/login")
    toast.success("User logout")
  }
  
  let location = useLocation();
 
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:"#f49d1a"}}>
    <div className="container-fluid">
      <Link className="navbar-brand" style={{fontWeight:"bolder"}} to="/">
       NoteVault
      </Link>
      <button className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link
              className={`nav-link ${
                location.pathname === '/' ? 'active' : ' '
              }`}
              aria-current="page"
              to="/"
            >
              Home
            </Link>
          </li>
        </ul>

      {!localStorage.getItem("token")?
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link
              className={`nav-link ${
                location.pathname === '/login' ? 'active' : ' '
              }`}
              to="/login"
              role="button"
            >
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${
                location.pathname === '/signup' ? 'active' : ' '
              }`}
              to="/signup"
              role="button"
            >
              Signup
            </Link>
          </li>
        </ul>:  <button onClick={handleLogout}
              type="button"
              className="btn btn-light"  >
              Logout
            </button>}
      </div>
    </div>
  </nav>
);
};

export default Header;

