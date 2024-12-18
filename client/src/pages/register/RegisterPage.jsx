import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthProvider";
function RegisterPage() {
  const { isAuthenticated, setIsAuthenticated, setProfile } = useAuth();

  const navigateTo = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:9000/auth/register",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      localStorage.setItem("jwt", data.token);
      toast.success(data.message || "User registered successfully");
      setProfile(data);
      setIsAuthenticated(true);
      setUsername("");
      setEmail("");
      setPassword("");
      navigateTo("/");
      alert('registered...')
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.message || "Please fill the required fields"
      );
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <form onSubmit={handleRegister}>
            <div className="font-semibold text-xl items-center text-center">
              Cilli<span className="text-blue-500">media</span>
            </div>
            <h1 className="text-xl font-semibold mb-6">Register</h1>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <p className="text-center mb-4">
              Already registered?{" "}
              <Link to={"/login"} className="text-blue-600">
                Login Now
              </Link>
            </p>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
