import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import SubmitLocationCard from "../../components/SubmitLocationCard/SubmitLocationCard";
import LocationPopUp from "../../components/LocationPopUp/LocationPopUp";
import SubmitMap from "../../components/SubmitMap/SubmitMap";
import i18n from "../../i18n";

const SubmitAndReview = () => {
  const location = useLocation();
  const itinerary = location.state.formData;
  const [selectLocation, setSelectLocation] = useState<any>(null);

  const handleClosePopup = () => {
    setSelectLocation(null);
  };

  // const handleCardClick = (location: any) => {
  //   setSelectLocation(location);
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("${process.env.REACT_APP_BACKEND_URL}itineraries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itinerary),
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        throw new Error("Failed to create itinerary");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <main className="itineraryview--container">
          <button>Back</button>
          <section className="info--container">
            <article>
              <h1>{itinerary.itinerary_name}</h1>
              <p>{itinerary.itinerary_descr}</p>
              <button>Like (+1)</button>
              <button>Dislike (+1)</button>
              <p>Likes: 0</p>
              <p>Dislikes: 0</p>
            </article>
            <SubmitMap locations={itinerary} />
          </section>
          <section className="cards--container">
            {itinerary.locationData &&
              itinerary.locationData.map((location: any) => (
                <SubmitLocationCard
                  key={location.id}
                  location={location}
                  handleClick={() => selectLocation(location)}
                />
              ))}
          </section>
          {selectLocation && (
            <LocationPopUp
              location={selectLocation}
              onClose={handleClosePopup}
            />
          )}
          <button>Submit</button>
        </main>
      </form>
    </>
  );
};

export default SubmitAndReview;
