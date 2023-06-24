import React from "react";
import CreateItinerary from "../../components/CreateItinerary/CreateItinerary";
import ItinPictureCard from "../../components/ItinPictureCard/ItinPictureCard";
import Navbar from "../../components/Navbar/Navbar";
import SearchItineraries from "../../components/SearchItineraries/SearchItineraries";
import KinjoNearYou from "../../components/KinjoNearYou/KinjoNearYou";
import PermissionsPopup from "../../components/PermissionsPopup/PermissionsPopup";
import Footer from "../../components/Footer/Footer";
import { getRandomItineraries } from "./helperFunctions";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Main.scss";

const Main = () => {
  const [showCreateItinerary, setShowCreateItinerary] =
    useState<boolean>(false);
  const [itineraries, setItineraries] = useState<any[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [permissionsAccepted, setPermissionsAccepted] = useState(false);

  useEffect(() => {
    const fetchItineraries = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}itineraries`);
      const data = await response.json();
      setItineraries(data);
    };

    const permissions = localStorage.getItem("permissions");
    if (permissions === "accepted") {
      setPermissionsAccepted(true);
    } else {
      setShowPopup(true);
    }

    fetchItineraries();
  }, []);

  const handleAcceptPermissions = () => {
    setPermissionsAccepted(true);
    localStorage.setItem("permissions", "accepted");
    setShowPopup(false);
  };

  const handleDeclinePermissions = () => {
    setPermissionsAccepted(false);
    localStorage.setItem("permissions", "declined");
    setShowPopup(false);
  };

  const filteredItineraries = getRandomItineraries(itineraries, 4);

  function toggleCreateItinerary(): void {
    setShowCreateItinerary(!showCreateItinerary);
  }

  return (
    <>
      {showPopup && (
        <PermissionsPopup
          onAccept={handleAcceptPermissions}
          onReject={handleDeclinePermissions}
        />
      )}
      {showCreateItinerary && (
        <CreateItinerary toggleCreateItinerary={toggleCreateItinerary} />
      )}
      <Navbar />
      <main className="main--container">
        <section className="search--container">
          <h2 className="main--title">K I N J O</h2>
          <SearchItineraries />
          <button className="create-btn" onClick={toggleCreateItinerary}>
            Create New Kinjo
          </button>
          <p className="main--tag">Exploration made for you, by you</p>
        </section>
        <section className="recommend--container">
          <h1>POPULAR</h1>
          {filteredItineraries.length === 0 ? (
            <div className="no-popular-msg">
              <p>There are no itineraries yet!</p>
            </div>
          ) : (
            filteredItineraries.map((itinerary: any, index: number) => (
              <Link
                to={`/kinjo/${itinerary.itinerary_id}`}
                key={itinerary.itinerary_id}
              >
                <ItinPictureCard itinerary={itinerary} index={index} />
              </Link>
            ))
          )}
        </section>
        <KinjoNearYou />
      </main>
      <Footer text={"kinjo"} />
    </>
  );
};

export default Main;
