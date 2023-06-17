import React, { useEffect, useState } from "react";
import { useKinjo } from "../../../contexts/KinjoContext";
import Map from "../../Map/Map";
import "./SetYourKinjo.scss";

interface LocationData {
  loc_coords: [number, number];
  loc_name: string;
  loc_descr_en: string;
  loc_tags: string[];
}

interface CreateItineraryData {
  firebase_uuid: string;
  itinerary_name: string;
  itinerary_descr: string;
  itinerary_tags: string[];
  enteredTag: string;
  locationData: LocationData[];
}

type SetYourKinjoProps = {
  forwardTransition: () => void;
  toggleCreateItinerary: () => void;
};

const SetYourKinjo = ({
  forwardTransition,
  toggleCreateItinerary,
}: SetYourKinjoProps) => {
  const { kinjo, changeKinjo } = useKinjo();
  const [formData, setFormData] = useState<CreateItineraryData>({
    firebase_uuid: "",
    itinerary_name: "",
    itinerary_descr: "",
    itinerary_tags: [],
    enteredTag: "",
    locationData: [],
  });
  useEffect(() => {
    changeKinjo({
      name: "test",
      description: "test",
      tags: [],
      locationData: [],
      kinjoCoords: [0, 0],
    });
  }, []);
  console.log(kinjo);

  const handleLocationData = (locationData: LocationData) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      locationData: [...prevFormData.locationData, locationData],
    }));
  };

  return (
    <div className="create-kinjo--container">
      <button
        className="create-kinjo-close-btn"
        onClick={toggleCreateItinerary}
      >
        <span className="material-symbols-outlined">cancel</span>
      </button>
      <h1>1. Set Your Kinjo</h1>
      <p>Click on the map, and drag to set the confines of your Kinjo!</p>
      <div className="setkinjo-map-container">
        PUT YOUR MAP HERE
        <Map handleLocationData={handleLocationData} />
      </div>
      <button disabled={false} onClick={forwardTransition}>
        Next ⇒
      </button>
    </div>
  );
};

export default SetYourKinjo;
