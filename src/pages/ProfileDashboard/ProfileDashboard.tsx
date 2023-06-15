import {useEffect, useState} from 'react'
import {useAuth} from '../../contexts/AuthContext'
import Navbar from '../../components/Navbar/Navbar'
import DProfile from '../../components/DashboardCompos/DProfile/DProfile'
import Footer from '../../components/Footer/Footer'

import './ProfileDashboard.scss'

const ProfileDashboard = () => {
    const {currentUser} = useAuth()
    const [userData, setUserData] = useState<any>({})

    useEffect(() => {
        fetchUserInfo();
    }, []);

    // function to fetch itineries from user

    // function to fetch user info
    async function fetchUserInfo() {
        try {
            const res = await fetch(`http://localhost:8000/users/${currentUser?.uid}`)
            const data = await res.json()
            console.log(data)
            setUserData(data)
        } catch (error) {
            console.error(error)
        }
    }

    // function to fetch user followers

    // function to fetch user following

    // function to fetch user image



  return (
   <>
    <Navbar />
    <div className="profiledashboard--container">
        <DProfile username={userData.username} email={userData.user_email} />
        {/* OWN COMPONENT */}
        <div>PLACEHOLDER MAP</div>
        {/* OWN COMPONENT */}
        <div className="profiledashboard--itineraries--container">
            <div className="profiledashboard--itineraries-cards">
                PLACEHOLDER CARDS
            </div>
        </div>
    </div>
    <Footer text='Kinjo' />
   </>
  )
}

export default ProfileDashboard