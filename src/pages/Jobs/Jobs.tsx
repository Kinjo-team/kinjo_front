import React from 'react'
import "./Jobs.scss"
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

const Jobs = () => {
  return (
    <>  
        <Navbar />
        <div className='jobs--container'>
            <h1>Thank you for your interest in joining the <b>KINJO</b> team! <br /> Unfortunately we are not currently hiring right now, but please check back again soon!
            </h1>
        </div>
        <Footer text='KINJO' />
    </>
  )
}

export default Jobs