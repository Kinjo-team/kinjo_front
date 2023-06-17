import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import LocationCard from "../../components/LocationCard/LocationCard";
import LocationPopUp from "../../components/LocationPopUp/LocationPopUp";
import Navbar from "../../components/Navbar/Navbar";
import ReadOnlyMap from "../../components/ReadOnlyMap/ReadOnlyMap";
import i18n from "../../i18n";

import "./ItineraryView.scss";

const ItineraryView = () => {
  const { currentUser } = useAuth();
  const { id } = useParams();
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [itinerary, setItinerary] = useState<any>({});
  const [likesCount, setLikesCount] = useState<any>(0);
  const [dislikesCount, setDislikesCount] = useState<any>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItinerary = async () => {
      const response = await fetch(
        `http://localhost:8000/itineraries/id/${id}`
      );
      const data = await response.json();
      console.log(data);
      setItinerary(data);
      console.log(i18n.language);
    };
    const fetchTotalLikesAndDislikes = async () => {
      const response = await fetch(`http://localhost:8000/likes/total/${id}`);
      const data = await response.json();
      setLikesCount(data.totalLikes);
      setDislikesCount(data.totalDislikes);
    };

    fetchItinerary();
    fetchTotalLikesAndDislikes();
  }, [id]);

  // HANDLERS
  function goBack() {
    navigate(-1);
  }

  function closePopup() {
    // New function to close the popup
    setSelectedLocation(null);
  }

  // FUNCTIONS
  function selectLocation(location: any) {
    setSelectedLocation(location);
  }

  const handleLikeButtonClick = async () => {
    const response = await fetch("http://localhost:8000/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firebase_uuid: currentUser?.uid,
        itinerary_id: itinerary.itinerary_id,
        value: 1,
        type: "like",
      }),
    });
    if (response.ok) {
      const data = await response.json();
      setLikesCount(data.totalLikes);
      setDislikesCount(data.totalDislikes);
    }
  };

  const handleDislikeButtonClick = async () => {
    const response = await fetch("http://localhost:8000/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firebase_uuid: currentUser?.uid,
        itinerary_id: itinerary.itinerary_id,
        value: 1,
        type: "dislike",
      }),
    });
    if (response.ok) {
      const data = await response.json();
      setLikesCount(data.totalLikes);
      setDislikesCount(data.totalDislikes);
    }
  };

  async function bookmarkItinerary() {
    const response = await fetch("http://localhost:8000/bookmarks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify({
            firebase_uuid: currentUser?.uid,
            itinerary_id: itinerary.itinerary_id,
        }),
    });
    if (response.ok) {
        const data = await response.json();
        console.log(data);
    }
}

  return (
    <>
      <Navbar />
      <main className="itineraryview--container">
        <button onClick={goBack}>Back</button>
        <section className="info--container">
          <article>
            <h1>{itinerary.itinerary_name}</h1>
            <p>{itinerary.itinerary_descr}</p>
            <button onClick={handleLikeButtonClick}>Like (+1)</button>
            <button onClick={handleDislikeButtonClick}>Dislike (+1)</button>
            <button onClick={bookmarkItinerary}>Bookmark</button>
            <p>Likes: {likesCount}</p>
            <p>Dislikes: {dislikesCount}</p>
          </article>
          <ReadOnlyMap locations={itinerary} />
        </section>
        <section className="cards--container">
          {itinerary.itinerary_locations &&
            itinerary.itinerary_locations.map((location: any) => (
              <LocationCard
                key={location.id}
                location={location}
                handleClick={() => selectLocation(location)}
              />
            ))}
        </section>
        {selectedLocation && (
          <LocationPopUp location={selectedLocation} onClose={closePopup} />
        )}
      </main>
    </>
  );
};

export default ItineraryView;
