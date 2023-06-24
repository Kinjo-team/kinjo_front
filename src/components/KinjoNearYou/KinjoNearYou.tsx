import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ItinPictureCard from "../ItinPictureCard/ItinPictureCard";

import "./KinjoNearYou.scss";

const KinjoNearYou = () => {
  const [coordinates, setCoordinates] = useState<[number, number]>([0, 0]);
  const [nearbyItineraries, setNearbyItineraries] = useState<any[]>([]);

  useEffect(() => {
    handleGetLocation();
  }, []);

  async function handleGetLocation() {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setCoordinates([lat, lon]);
  
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}itineraries/nearby`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ lat, lon }),
        });
  
        const nearbyItineraries = await response.json();
        setNearbyItineraries(nearbyItineraries);
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="near--container">
      <h1>NEAR YOU</h1>
      {nearbyItineraries.length !== 0 ? nearbyItineraries.slice(0, 4).map((itinerary, index) => (
        <Link
          to={`/kinjo/${itinerary.itinerary_id}`}
          key={itinerary.itinerary_id}
        >
          <ItinPictureCard
            itinerary={itinerary}
            index={index}
            key={itinerary.itinerary_id}
          />
        </Link>
      ))
      : 
      (
        <div className="no-kinjos-msg">
          <p>There are no Kinjo's near you at this time.</p>
        </div>
      )}
    </div>
  );
};

export default KinjoNearYou;
