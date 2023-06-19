import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import OUProfile from '../../components/OtherUsersProfileCompos/OUProfile/OUProfile'
import OUKinjos from '../../components/OtherUsersProfileCompos/OUKinjos/OUKinjos'
import Footer from '../../components/Footer/Footer'

import './OtherUsersProfile.scss'

const OtherUsersProfile = () => {
    const { username } = useParams();
    const navigate = useNavigate();


    // FUNCTIONS
    function goBack() {
        navigate(-1);
      }

  return (
    <>
        <Navbar />
        <div className="otherusersprofile--container">
            <button className="back-btn" onClick={goBack}>Back</button>
            <OUProfile username={username} />
            <OUKinjos username={username} />
        </div>
        <Footer text='Kinjo' />
    </>
  )
}

export default OtherUsersProfile