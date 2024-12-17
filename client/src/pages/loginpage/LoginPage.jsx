import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PasswordInput from "../../components/inputs/PasswordInput";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in by verifying the presence of a token
    const token = localStorage.getItem("token");
    if (token) {
      // If user is logged in, redirect to the homepage
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username) {
      setError("Please enter your username");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    // Login API Call
    try {
      const res = await axios.post(
        "http://localhost:9000/auth/login",
        { username, password },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        alert(res.data.message);
        console.log(res.data);
        return;
      }

      // If login is successful, store the token in localStorage
      localStorage.setItem("token", res.data.token);

      alert("Login successful!");
      navigate("/"); // Redirect to homepage after login
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handleLogin}>
          <h4 className="text-2xl mb-7">Login</h4>

          <input
            type="text"
            placeholder="Username"
            className="input-box"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

          <button type="submit" className="btn-primary">
            LOGIN
          </button>

          <p className="text-sm text-center mt-4">
            Not registered yet?{" "}
            <Link
              to={"/signup"}
              className="font-medium text-[#2B85FF] underline"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
