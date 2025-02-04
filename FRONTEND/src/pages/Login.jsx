import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
        .post(
          "http://localhost:3000/api/v1/user/login",
          { email, password, confirmPassword, role: "Patient" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
      toast.success(response.data.message);
      setIsAuthenticated(true)
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <div className="container form-component login-form">
        <h2>Sign In</h2>
        <p>Please Login To Continue</p>
        <p>
          Sign in to your account to manage appointments, access patient records, streamline hospital operations, and provide seamless healthcare services.
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Not Registered?</p>
            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Register Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "#007bff",
                color: "white",
                padding: "12px 24px",
                fontSize: "16px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background 0.3s ease-in-out, transform 0.2s ease-in-out, box-shadow 0.3s ease-in-out"
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#0056b3";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#007bff";
                e.target.style.transform = "scale(1)";
              }}
              onClick={(e) => {
                e.target.style.animation = "glowEffect 0.5s ease-in-out";
                setTimeout(() => e.target.style.animation = "", 500);
              }}
            >
              Login
            </button>

            <style>
              {`
    @keyframes glowEffect {
        0% { box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); background-color: #007bff; }
        50% { box-shadow: 0 0 20px rgba(0, 123, 255, 0.8); background-color: #0056b3; }
        100% { box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); background-color: #007bff; }
    }
`}
            </style>

          </div>
        </form>
      </div>
    </>
  );
};

export default Login;