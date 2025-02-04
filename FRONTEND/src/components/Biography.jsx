import React from 'react'

const Biography = ({imageURL}) => {
  return (
    <div className='conatiner biography'>
      <div className="banner">
        <img src={imageURL} alt="aboutImg" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who are we</h3>
        <p>At Bharat Care, we are committed to revolutionizing hospital management by providing an efficient, digital-first solution for healthcare facilities. Our platform streamlines hospital operations, ensuring seamless patient management, appointment scheduling, billing, and medical records handling.</p>
        <p>With a focus on innovation, security, and user-friendliness, Bharat Care empowers hospitals, clinics, and healthcare professionals to deliver high-quality care with reduced administrative burdens. Our system is designed to enhance patient experience, improve workflow efficiency, and support data-driven decision-making.</p>
        <p>Whether you are a hospital administrator, doctor, nurse, or patient, Bharat Care ensures a smooth and hassle-free healthcare journey through advanced digital solutions tailored for the Indian healthcare ecosystem.</p>
      </div>
      
    </div>
  )
}

export default Biography
