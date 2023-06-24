import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import DProfile from "../../components/DashboardCompos/DProfile/DProfile";
import DKinjoViewer from "../../components/DashboardCompos/DKinjoViewer/DKinjoViewer";
import DKinjoBookmarked from "../../components/DashboardCompos/DKinjoBookmarked/DKinjoBookmarked";
import DMap from "../../components/DashboardCompos/DMap/DMap";
import Footer from "../../components/Footer/Footer";

import "./ProfileDashboard.scss";

const ProfileDashboard = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState<any>({});
  const [visitedPlaces, setVisitedPlaces] = useState<any[]>([]);

  useEffect(() => {
    const fetchLocationCoords = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}visited_map/${currentUser?.uid}`
      );
      const data = await response.json();
      setVisitedPlaces(data);
    };
    fetchLocationCoords();
    fetchUserInfo();
  }, []);

  // function to fetch itineries from user

  // function to fetch user info
  async function fetchUserInfo() {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}users/${currentUser?.uid}`
      );
      const data = await res.json();
      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  }

  // function to fetch user followers

  // function to fetch user following

  // function to fetch user image

  return (
    <>
      <Navbar />
      <div className="profiledashboard--container">
        <DProfile username={userData.username} email={userData.user_email} userImage={userData.user_img} />
        <DMap userData={userData} visitedPlaces={visitedPlaces} />
        <DKinjoViewer />
        <DKinjoBookmarked />
      </div>
      <Footer text="Kinjo" />
    </>
  );
};

export default ProfileDashboard;
