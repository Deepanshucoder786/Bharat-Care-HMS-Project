import React, { useContext } from 'react'
import { Context } from '../main'
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { Link } from 'react-router-dom';


const Register = () => {
  const { isAuthenticated, setisAuthenticated } = useContext(Context);
  const [firstName, setfirstName] = useState("")
  const [lastName, setlastName] = useState("")
  const [email, setemail] = useState("")
  const [phone, setphone] = useState("")
  const [nic, setnic] = useState("")
  const [dob, setdob] = useState("")
  const [gender, setgender] = useState("")
  const [password, setpassword] = useState("")
  const navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("https://bharat-care-hms-project-backend.onrender.com/api/v1/user/patient/register",
        { firstName, lastName, email, phone, nic, dob, gender, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          }
        }
      )
      toast.success(response.data.message)
      setisAuthenticated(true)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  if (isAuthenticated) {
    return <Navigate to={"/"} />

  }
  return (
    <div className='container form-component register-form'>
      <h2>Sign Up</h2>
      <p>Please Sign Up to Continue</p>
      <p> Join Bharat Care and streamline hospital management with our smart healthcare solutions.
      <span>🔹 For Hospitals & Clinics – Manage patient records, appointments, billing, and more.</span>
      </p>
      <form onSubmit={handleRegister}>
        <div>
          <input type="text" placeholder='First Name' value={firstName} onChange={(e) => setfirstName(e.target.value)} />
          <input type="text" placeholder='Last Name ' value={lastName} onChange={(e) => setlastName(e.target.value)} />
        </div>
        <div>
          <input type="text" placeholder='Email' value={email} onChange={(e) => setemail(e.target.value)} />
          <input type="number" placeholder='Phone Number ' value={phone} onChange={(e) => setphone(e.target.value)} />
        </div>
        <div>
          <input type="text" placeholder='NIC' value={nic} onChange={(e) => setnic(e.target.value)} />
          <input type="date" placeholder='DOB ' value={dob} onChange={(e) => setdob(e.target.value)} />
        </div>
        <div>
          <select value={gender} onChange={(e) => setgender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>

          </select>
          <input type="password" placeholder='Password ' value={password} onChange={(e) => setpassword(e.target.value)} />
        </div>
        <div style={{ gap: "10px", justifyContent: "flex-end", flexDirection: "row" }}>
          <p style={{ marginBottom: "0" }}>Already Register ?</p>
          <Link to={"/login"} style={{ textDecoration: "none", alignItem: "center" }}>
            Login Now
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
              Register
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
  )
}

export default Register
