import CreateItinerary from "../../components/CreateItinerary/CreateItinerary";
import { useState } from "react";
import "./Main.scss";

const Main = () => {
  const [showCreateItinerary, setShowCreateItinerary] =
    useState<boolean>(false);

  function toggleCreateItinerary() {
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
          <div className="placeholder">PLACE</div>
          <div className="placeholder">PLACE</div>
          <div className="placeholder">PLACE</div>
        </section>
      </main>
    </>
  );
};

export default Main;
