import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthProvider";

function Navbar() {
  const [show, setShow] = useState(false);

  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:9000/auth/logout", {}, {
        withCredentials: true,
      });
      localStorage.removeItem("jwt"); // Remove the JWT token from local storage
      toast.success(response.data.message || "Logged out successfully");
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      const errorMessage =
        error.response?.data?.message || "An error occurred during logout";
      toast.error(errorMessage);
    }
  };
  

  return (
    <nav className="shadow-lg px-4 py-2">
      <div className="flex items-center justify-between container mx-auto">
        <div className="font-semibold text-xl">
          Cilli<span className="text-blue-500">Blog</span>
        </div>

        {/* Desktop Navigation */}
        <div className="mx-6">
          <ul className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-blue-500">
              HOME
            </Link>
            <Link to="/blogs" className="hover:text-blue-500">
              BLOGS
            </Link>
            <Link to="/creators" className="hover:text-blue-500">
              CREATORS
            </Link>
            <Link to="/about" className="hover:text-blue-500">
              ABOUT
            </Link>
            <Link to="/contact" className="hover:text-blue-500">
              CONTACT
            </Link>
          </ul>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden" onClick={() => setShow(!show)}>
            {show ? "CLOSE" : "MENU"}
          </div>
        </div>

        {/* Authentication Options */}
        <div className="hidden md:flex space-x-2">
          {isAuthenticated && profile?.user?.role === "admin" && (
            <Link
              to="/dashboard"
              className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded"
            >
              DASHBOARD
            </Link>
          )}

          {!isAuthenticated ? (
            <Link
              to="/login"
              className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
            >
              LOGIN
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
            >
              LOGOUT
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      {show && (
        <div className="bg-white">
          <ul className="flex flex-col h-screen items-center justify-center space-y-3 md:hidden text-xl">
            <Link
              to="/"
              onClick={() => setShow(!show)}
              className="hover:text-blue-500"
            >
              HOME
            </Link>
            <Link
              to="/blogs"
              onClick={() => setShow(!show)}
              className="hover:text-blue-500"
            >
              BLOGS
            </Link>
            <Link
              to="/creators"
              onClick={() => setShow(!show)}
              className="hover:text-blue-500"
            >
              CREATORS
            </Link>
            <Link
              to="/about"
              onClick={() => setShow(!show)}
              className="hover:text-blue-500"
            >
              ABOUT
            </Link>
            <Link
              to="/contact"
              onClick={() => setShow(!show)}
              className="hover:text-blue-500"
            >
              CONTACT
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
