import React from 'react'
import AppointmentForm from '../components/AppointmentForm.jsx'
import Hero from "../components/Hero.jsx"
const Appointment = () => {
  return (
   <>
   <Hero title={"Schedule Your Appointment | ZeeCare Medical Institute"} imageURL={"/signin.png"}/>
   <AppointmentForm/>
   </>
  )
}

export default Appointment
