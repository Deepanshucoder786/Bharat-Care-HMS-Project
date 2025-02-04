import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "https://bharat-care-hms-project-backend.onrender.com/api/v1/appointment/getall",
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        setAppointments(data.appointments);
      } catch (error) {
        setAppointments([]);
      }
    };

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
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `https://bharat-care-hms-project-backend.onrender.com/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const { isAuthenticated, admin } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src="/doc.png" alt="docImg" />
            <div className="content">
              <div>
                <p>Hello ,</p>
                <h5>
                  {admin &&
                    `${admin.firstName} ${admin.lastName}`}{" "}
                </h5>
              </div>
              <p>
                Welcome to the Bharat Care Admin Panel, your all-in-one platform for efficiently managing hospital operations. This dashboard provides a seamless and intuitive interface to oversee critical aspects of hospital administration, ensuring smooth and organized workflows.
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Appointments</p>
            <h3>{appointments.length}</h3>
          </div>
          <div className="thirdBox">
            <p>Registered Doctors</p>
            <h3>{doctors.length}</h3>
          </div>
        </div>
        <div className="banner">
          <h5>Appointments</h5>
          <div className="table-responsive"
            style={{
              overflowX: "auto", // Enable horizontal scrolling
              maxWidth: "100%", // Ensure it doesn't exceed the parent width
            }}>
            <table style={{
              width: "100%",
              minWidth: "600px", // Ensures table doesn't shrink too much on small screens
              borderCollapse: "collapse",
            }}>
              <thead>
                <tr>
                  <th style={{ padding: "10px", textAlign: "left" }}>Patient</th>
                  <th style={{ padding: "10px", textAlign: "left" }}>Date</th>
                  <th style={{ padding: "10px", textAlign: "left" }}>Doctor</th>
                  <th style={{ padding: "10px", textAlign: "left" }}>Department</th>
                  <th style={{ padding: "10px", textAlign: "left" }}>Status</th>
                  <th style={{ padding: "10px", textAlign: "left" }}>Visited</th>
                </tr>
              </thead>
              <tbody>
                {appointments && appointments.length > 0
                  ? appointments.map((appointment) => (
                    <tr key={appointment._id}>
                      <td style={{ padding: "8px" }}>{`${appointment.firstName} ${appointment.lastName}`}</td>
                      <td style={{ padding: "8px" }}>{appointment.appointment_date.substring(0, 16)}</td>
                      <td style={{ padding: "8px" }}>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                      <td style={{ padding: "8px" }}>{appointment.department}</td>
                      <td style={{ padding: "8px" }}>
                        <select
                          className={
                            appointment.status === "Pending"
                              ? "value-pending"
                              : appointment.status === "Accepted"
                                ? "value-accepted"
                                : "value-rejected"
                          }
                          value={appointment.status}
                          onChange={(e) =>
                            handleUpdateStatus(appointment._id, e.target.value)
                          }
                        >
                          <option value="Pending" className="value-pending">
                            Pending
                          </option>
                          <option value="Accepted" className="value-accepted">
                            Accepted
                          </option>
                          <option value="Rejected" className="value-rejected">
                            Rejected
                          </option>
                        </select>
                      </td>
                      <td>{appointment.hasVisited === true ? <GoCheckCircleFill className="green" /> : <AiFillCloseCircle className="red" />}</td>
                    </tr>
                  ))
                  : "No Appointments Found!"}
              </tbody>
            </table>
          </div>

          { }
        </div>
      </section>
    </>
  );
};

export default Dashboard;
