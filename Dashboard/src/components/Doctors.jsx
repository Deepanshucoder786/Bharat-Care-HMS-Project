import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "https://bharat-care-hms-project-backend.onrender.com/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchDoctors();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  // Filter doctors based on search query
  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor.firstName} ${doctor.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <section className="page doctors">
      <h1>DOCTORS</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      <div className="banner">
        {filteredDoctors && filteredDoctors.length > 0 ? (
          filteredDoctors.map((element) => {
            return (
              <div className="card" key={element._id}>
                <img
                  src={element.docAvatar && element.docAvatar.url}
                  alt="doctor avatar"
                />
                <h4>{`${element.firstName} ${element.lastName}`}</h4>
                <div className="details">
                  <p>Email: <span>{element.email}</span></p>
                  <p>Phone: <span>{element.phone}</span></p>
                  <p>DOB: <span>{element.dob.substring(0, 10)}</span></p>
                  <p>Department: <span>{element.doctorDepartment}</span></p>
                  <p>NIC: <span>{element.nic}</span></p>
                  <p>Gender: <span>{element.gender}</span></p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Registered Doctors Found!</h1>
        )}
      </div>

      {/* Inner CSS for the Search Bar */}
      <style>
        {`
          /* Search Bar Styling */
          .search-bar {
            width: 100%;
            max-width: 400px;
            padding: 10px;
            margin: 10px auto;
            display: block;
            border: 2px solid #4A90E2;
            border-radius: 8px;
            font-size: 16px;
            outline: none;
            transition: all 0.3s ease-in-out;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          /* Search Bar Focus Animation */
          .search-bar:focus {
            border-color: #0D6EFD;
            box-shadow: 0 0 10px rgba(13, 110, 253, 0.5);
            transform: scale(1.05);
          }

          /* Responsive Search Bar */
          @media (max-width: 768px) {
            .search-bar {
              width: 90%;
            }
          }
        `}
      </style>
    </section>
  );
};

export default Doctors;
