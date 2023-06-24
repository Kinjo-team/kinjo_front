import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import OUProfile from '../../components/OtherUsersProfileCompos/OUProfile/OUProfile'
import OUKinjos from '../../components/OtherUsersProfileCompos/OUKinjos/OUKinjos'
import Footer from '../../components/Footer/Footer'

import './OtherUsersProfile.scss'

const OtherUsersProfile = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState<any>({});

    useEffect(() => {
        fetchUserInfo();
    }, [])

    // FUNCTIONS
    function goBack() {
        navigate(-1);
      }
    
    async function fetchUserInfo() {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}users/username/${username}`
        );
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    }

  return (
    <>
        <Navbar />
        <div className="otherusersprofile--container">
            <button className="back-btn" onClick={goBack}>Back</button>
            <OUProfile username={username} userImage={userData.user_img} />
            <OUKinjos username={username} />
        </div>
        <Footer text='Kinjo' />
    </>
  )
}

export default OtherUsersProfile