import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

import "./ContactUs.scss"

const ContactUs = () => {
  return (
    <>
        <Navbar />
        <div className='contactus--container'>
            <h1>This page is under construction 🚧</h1>
            <p>If you would like to contact the <b>KINJO</b> team, please email us at <i>kinjo_team@proton.me</i></p>
        </div>
        <Footer text='KINJO' />
    </>
  )
}

export default ContactUs