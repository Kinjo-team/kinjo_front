import CreateItinerary from "../../components/CreateItinerary/CreateItinerary";
import ItinPictureCard from "../../components/ItinPictureCard/ItinPictureCard";
import Navbar from "../../components/Navbar/Navbar";
import SearchItineraries from "../../components/SearchItineraries/SearchItineraries";
import Footer from "../../components/Footer/Footer";
import { getRandomItineraries } from "./helperFunctions";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Main.scss";

const Main = () => {
  const [showCreateItinerary, setShowCreateItinerary] =
    useState<boolean>(false);
  const [itineraries, setItineraries] = useState<any[]>([]);

  useEffect(() => {
    const fetchItineraries = async () => {
      const response = await fetch(`http://localhost:8000/itineraries`);
      const data = await response.json();
      console.log(data);
      setItineraries(data);
    };

    fetchItineraries();
  }, []);

  const filteredItineraries = getRandomItineraries(itineraries, 3);

  function toggleCreateItinerary(): void {
    setShowCreateItinerary(!showCreateItinerary);
  }

  return (
    <>
      {showCreateItinerary && (
        <CreateItinerary toggleCreateItinerary={toggleCreateItinerary} />
      )}
      <Navbar />
      <main className="main--container">
        <section className="search--container">
          <h2 className="main--title">K I N J O</h2>
          <SearchItineraries />
          <button className="create-btn" onClick={toggleCreateItinerary}>
            Create Your Own Itinerary
          </button>
          <p className="main--tag">"Exploration made for you, by you"</p>
        </section>
        <section className="recommend--container">
          {filteredItineraries.map((itinerary: any, index: number) => (
            <Link to={`/itinerary/${itinerary.itinerary_id}`} key={itinerary.itinerary_id}>
              <ItinPictureCard itinerary={itinerary} index={index} />
            </Link>
          ))}
        </section>
      </main>
      <Footer text={"kinjo"} />
    </>
  );
};

export default Main;
