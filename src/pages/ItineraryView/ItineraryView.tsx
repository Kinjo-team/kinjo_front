import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import LocationCard from "../../components/LocationCard/LocationCard";
import LocationPopUp from "../../components/LocationPopUp/LocationPopUp";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ReadOnlyMap from "../../components/ReadOnlyMap/ReadOnlyMap";
import i18n from "../../i18n";

import "./ItineraryView.scss";

const ItineraryView = () => {
  const { currentUser } = useAuth();
  const { id } = useParams();
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [itinerary, setItinerary] = useState<any>({});
  const [author, setAuthor] = useState<any>({});
  const [likesCount, setLikesCount] = useState<any>(0);
  const [dislikesCount, setDislikesCount] = useState<any>(0);
  const [isFollowing, setIsFollowing] = useState<any>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItinerary = async () => {
      const response = await fetch(
        `http://localhost:8000/itineraries/id/${id}`
      );
      const data = await response.json();
      setItinerary(data);
      fetchAuthor(data.firebase_uuid);
      checkIfFollowing(data.firebase_uuid);
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
  }, []);

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
      setLikesCount(data.totalLikes + 1);
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
      setDislikesCount(data.totalDislikes + 1);
    }
  };

  async function fetchAuthor(authorID : string) {
    try {
        const response = await fetch(
          `http://localhost:8000/users/${authorID}`
        );
        const data = await response.json();
        setAuthor(data);
        console.log(data)
    } catch (error) {
        console.error(error);
    }
  }


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

async function followAuthor() {
    const response = await fetch("http://localhost:8000/followers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify({
            firebase_uid: currentUser?.uid,
            follower_uid: author.firebase_uuid,
        }),
    });
    if (response.ok) {
        const data = await response.json();
        console.log(data);
    }
}

async function checkIfFollowing(authorId : string) {
    try {
        const res = await fetch(`http://localhost:8000/following/check`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firebase_uid: currentUser?.uid,
                    follower_uid: authorId,
                    }),
        })
        const data = await res.json()
        setIsFollowing(data.length > 0 ? true : false)
    } catch (error) {
        console.error(error)
    }
}

  return (
    <>
      <Navbar />
      <main className="itineraryview--container">
        <button className="back-btn" onClick={goBack}>Back</button>
        <section className="info--container">
          <article className="main-info">
            <div className="kinjo-info">
                <div className="kinjo-header">
                    <h1>{itinerary.itinerary_name}</h1>
                    <div className="kinjo-btn-grp">
                        <button onClick={bookmarkItinerary}><span className="material-symbols-outlined favourite-btn">star</span></button>
                    </div>
                </div>
                <p className="kinjo-desc">{itinerary.itinerary_descr}</p>
            </div>
            <div className="author-info">
                <p>{author.username}</p>
                {isFollowing ? 
                    <button disabled={true} className="following-btn">Following</button>    
                    : 
                    <button className="follow-btn" onClick={followAuthor}>Follow</button>
                }
                <div className="vote-container">
                    <p className="upvote" onClick={handleLikeButtonClick}><span className="material-symbols-outlined">thumb_up</span>{likesCount}</p>
                    <p className="downvote" onClick={handleDislikeButtonClick} ><span className="material-symbols-outlined">thumb_down</span>{dislikesCount}</p>
                </div>
            </div>
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
      <Footer text="Kinjo" />
    </>
  );
};

export default ItineraryView;
