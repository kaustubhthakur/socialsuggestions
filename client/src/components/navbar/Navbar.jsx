import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in (e.g., using a token)
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set login state based on token presence
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const onLogout = async () => {
    try {
      const res = await axios.get("http://localhost:9000/auth/logout", {
        withCredentials: true,
      });

      if (res.data.success === false) {
        alert(res.data.message);
        console.log(res.data.message);
        return;
      }

      alert("Logout successful!");
      localStorage.removeItem("token"); // Remove token on logout
      setIsLoggedIn(false); // Update login state
      navigate("/login");
    } catch (error) {
      alert("An error occurred: " + error.message);
      console.error(error.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">MyLogo</div>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        {isLoggedIn ? (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;
