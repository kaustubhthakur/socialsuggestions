import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
    <img className='logo-bar' src="data:image/png;base64,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" alt="logo" />
      </div>
      <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/register" className="nav-link">Register</Link>
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
