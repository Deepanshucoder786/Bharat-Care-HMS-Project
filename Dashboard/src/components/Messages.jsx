import React, { useContext, useState } from 'react'
import { Context } from '../main'
import axios from 'axios'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
const Messages = () => {
  const [messages, setMessages] = useState([])
  const { isAuthenticated } = useContext(Context)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get("https://bharat-care-hms-project-backend.onrender.com/api/v1/message/getall", { withCredentials: true })
        setMessages(data.messages)
      } catch (error) {
        console.log("Error are occured when fetching the Messages", error)
      }
    }
    fetchMessages();
  }, [isAuthenticated])
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />
  }
  return (
    <section className='page messages' style={{ padding: "20px", backgroundColor: "#f8f9fa" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "20px", fontWeight: "bold", color: "#333" }}>
        Messages <span style={{ color: "#007bff" }}>({messages.length})</span>
      </h1>

      <div className="banner" style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {messages && messages.length > 0 ? (
          messages.map((element, index) => {
            return (
              <div
                className="card"
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#007bff" : "#28a745",
                  color: "#fff",
                  padding: "20px",
                  borderRadius: "10px",
                  width: "300px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
                }}
              >
                <div className="details" style={{ fontSize: "14px", lineHeight: "1.6" }}>
                  <p><strong>First Name:</strong> <span>{element.firstName}</span></p>
                  <p><strong>Last Name:</strong> <span>{element.lastName}</span></p>
                  <p><strong>Email:</strong> <span>{element.email}</span></p>
                  <p><strong>Phone Number:</strong> <span>{element.phone}</span></p>
                  <p><strong>Message:</strong> <span>{element.message}</span></p>
                </div>
              </div>
            );
          })
        ) : (
          <h1 style={{ color: "#555" }}>No Messages</h1>
        )}
      </div>
    </section>
  )
}

export default Messages
