import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const hours = [
    { id: 1, day: "Monday", time: "9:00 AM - 11:00 PM" },
    { id: 2, day: "Tuesday", time: "12:00 PM - 12:00 AM" },
    { id: 3, day: "Wednesday", time: "10:00 AM - 10:00 PM" },
    { id: 4, day: "Thursday", time: "9:00 AM - 9:00 PM" },
    { id: 5, day: "Friday", time: "3:00 PM - 9:00 PM" },
    { id: 6, day: "Saturday", time: "9:00 AM - 3:00 PM" },
  ];

  return (
    <>
      <footer className="container" style={footerStyle}>
        <hr style={hrStyle} />
        <div className="content" style={contentStyle}>
          {/* Logo Section */}
          <div style={logoContainer}>
            <img src="/bharatCare2.png" alt="logo" className="logo-img" style={logoStyle} />
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={headingStyle}>Quick Links</h4>
            <ul style={listStyle}>
              <Link to={"/"} style={linkStyle}>Home</Link>
              <Link to={"/appointment"} style={linkStyle}>Appointment</Link>
              <Link to={"/about"} style={linkStyle}>About</Link>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 style={headingStyle}>Hours</h4>
            <ul style={listStyle}>
              {hours.map((element) => (
                <li key={element.id} style={listItemStyle}>
                  <span style={dayStyle}>{element.day}</span>
                  <span style={timeStyle}>{element.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 style={headingStyle}>Contact</h4>
            <div style={contactItemStyle}>
              <FaPhone style={iconStyle} />
              <span style={contactTextStyle}>999-999-9999</span>
            </div>
            <div style={contactItemStyle}>
              <MdEmail style={iconStyle} />
              <span style={contactTextStyle}>bharatCare@gmail.com</span>
            </div>
            <div style={contactItemStyle}>
              <FaLocationArrow style={iconStyle} />
              <span style={contactTextStyle}>Delhi, India</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

/* 🔥 New Blue Color Scheme */
const footerStyle = {
  backgroundColor: "#003366", // Dark Blue background
  color: "#e6f1ff", // Light Blue text color
  padding: "40px 20px",
  fontSize: "14px",
  marginTop: "40px",
};

const hrStyle = {
  border: "none",
  height: "1px",
  background: "#4f6d7a", // Light grayish blue for divider
  marginBottom: "20px",
};

const contentStyle = {
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "20px",
};

const logoContainer = {
  flex: "1",
};

const logoStyle = {
  maxWidth: "120px",
};

const headingStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "10px",
  borderBottom: "2px solid #4d99ff", // Lighter Blue accent
  display: "inline-block",
  paddingBottom: "5px",
};

const listStyle = {
  listStyle: "none",
  padding: "0",
  margin: "0",
};

const linkStyle = {
  display: "block",
  color: "#cce7ff", // Lighter blue for links
  textDecoration: "none",
  marginBottom: "8px",
  transition: "color 0.3s ease-in-out",
};

const listItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "5px",
};

const dayStyle = {
  fontWeight: "bold",
};

const timeStyle = {
  fontStyle: "italic",
};

const contactItemStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "8px",
};

const iconStyle = {
  marginRight: "8px",
  color: "#4d99ff", // Lighter blue for icons
};

const contactTextStyle = {
  color: "#cce7ff", // Lighter blue for contact text
};

export default Footer;
