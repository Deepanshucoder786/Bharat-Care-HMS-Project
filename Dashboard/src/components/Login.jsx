import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Context } from "../main";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:3000/api/v1/user/login",
          { email, password, confirmPassword, role: "Admin" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then(res => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <section className="container form-component">
        <img src="/bharatCare2.png" alt="logo" className="logo" />
        <h1 className="form-title">WELCOME TO BharatCare</h1>
        <p>Only Admins Are Allowed To Access These Resources!</p>
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
          <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button
              type="submit"
              style={{
                background: "linear-gradient(135deg, #ff7e5f, #feb47b)", // Modern gradient
                color: "#fff",
                border: "none",
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                borderRadius: "8px",
                transition: "all 0.3s ease-in-out",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                display: "inline-block",
                textTransform: "uppercase",
                letterSpacing: "1px",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "linear-gradient(135deg, #ff6a54, #fd9e65)";
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.3)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "linear-gradient(135deg, #ff7e5f, #feb47b)";
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
              }}
              onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
              onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
            >
              Login
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;