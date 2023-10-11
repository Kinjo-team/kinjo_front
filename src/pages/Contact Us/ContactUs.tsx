import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import "./ContactUs.scss"

const ContactUs = () => {
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    purpose: 'User Support',
    comment: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // send data to backend
    try {
      const response = await fetch('api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactFormData)
      });
      if (response.ok) {
        alert('Email was sent successfully!');
      } else {
        alert('There was an error sending the email.');
      }
    }catch (error) {
      console.error('There was an error sending the email: ', error)
    }
  };

  return (
    <>
        <Navbar />
        <div className='contactus--container'>
            <h1>Contact Us</h1>
            {/* <p>If you would like to contact the <b>KINJO</b> team, please email us at <i>kinjo_team@proton.me</i></p> */}
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                name='name'
                placeholder='Name'
                value={contactFormData.name}
                onChange={handleChange}
                required
              />
              <input
                type='email'
                name='email'
                placeholder='Email'
                value={contactFormData.email}
                onChange={handleChange}
                required
              />
              <select 
                name='purpose' 
                value={contactFormData.purpose}
                onChange={handleChange}>
                  <option value='User Support'>User Support</option>
                  <option value='Business Inquiries'>Business Inquiries</option>
                  <option value='General Inquiries'>General Inquiries</option>
                  <option value='Feedback'>Feedback</option>
                  <option value='Report Abuse'>Report Abuse</option>
              </select>
              <textarea
                name='comment'
                placeholder='Your Comment'
                value={contactFormData.comment}
                onChange={handleChange}
                required
              />
              <button type='submit'>Submit</button>
            </form>
        </div>
        <Footer text='KINJO' />
    </>
  )
}

export default ContactUs