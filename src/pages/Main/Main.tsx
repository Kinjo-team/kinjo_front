import CreateItinerary from "../../components/CreateItinerary/CreateItinerary";
import ItinPictureCard from "../../components/ItinPictureCard/ItinPictureCard";
import { getRandomItineraries } from "./helperFunctions";
import { useState, useEffect } from "react";
import "./Main.scss";

const Main = () => {
  const [showCreateItinerary, setShowCreateItinerary] = useState<boolean>(false);
  const [itineraries, setItineraries] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchItineraries = async () => {
      const response = await fetch(`http://localhost:8000/itineraries`);
      const data = await response.json();
      setItineraries(data);
    };

    fetchItineraries();
  }, [])

 
  const filteredItineraries = getRandomItineraries(itineraries, 3);


  function toggleCreateItinerary(): void {
    setShowCreateItinerary(!showCreateItinerary);
  }

  return (
    <>
      {showCreateItinerary && (
        <CreateItinerary toggleCreateItinerary={toggleCreateItinerary} />
      )}
      <main className="main--container">
        <section className="search--container">
          <h2 className="title">K I N J O</h2>
          <form className="search--form">
            <input type="search" placeholder="Search for a place" />
            <button>Search</button>
          </form>
          <button onClick={toggleCreateItinerary}>
            Create Your Own Itinerary
          </button>
          <p>"Exploration made for you, by you"</p>
        </section>
        <section className="recommend--container">
          <h1>Popular spots:</h1>
          {filteredItineraries.map((itinerary: any) => (
            <ItinPictureCard key={itinerary.itinerary_id} itinerary={itinerary} />
          ))}
        </section>
      </main>
    </>
  );
};

export default Main;
