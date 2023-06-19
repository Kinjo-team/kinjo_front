import { use } from "i18next";
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ItinPictureCard from "../ItinPictureCard/ItinPictureCard";

const KinjoNearYou = () => {
  const [coordinates, setCoordinates] = useState<[number, number]>([0, 0]);
  const [nearbyItineraries, setNearbyItineraries] = useState<any[]>([]);

  useEffect(() => {
    console.log("Coordinates", coordinates);
  }, [coordinates]);

  function handleGetLocation() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      setCoordinates([lat, lon]);

      const response = await fetch("http://localhost:8000/itineraries/nearby", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lat, lon }),
      });

      const nearbyItineraries = await response.json();
      console.log(nearbyItineraries);
      setNearbyItineraries(nearbyItineraries);
    });
  }

  return (
    <div>
      <button onClick={handleGetLocation}>Find A Kinjo Near You!</button>
      <p>
        {coordinates[0]}, {coordinates[1]}
      </p>
      {nearbyItineraries.map((itinerary, index) => (
        <Link
          to={`/itinerary/${itinerary.itinerary_id}`}
          key={itinerary.itinerary_id}
        >
          <ItinPictureCard
            itinerary={itinerary}
            index={index}
            key={itinerary.itinerary_id}
          />
        </Link>
      ))}
    </div>
  );
};

export default KinjoNearYou;
