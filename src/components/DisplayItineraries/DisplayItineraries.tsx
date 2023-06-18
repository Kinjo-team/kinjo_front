import React from 'react';
import { Link } from "react-router-dom";
import './DisplayItineraries.scss';

interface DisplayItinerariesProps {
    itineraries: any[];
    toggleShowResults: () => void;
  }

const DisplayItineraries: React.FC<DisplayItinerariesProps> = ({ itineraries, toggleShowResults }) => {

    return (
        <main className="display-itineraries--overlay">
            <div className='display-itineraries--container'>
                <button onClick={toggleShowResults} className='display-itineraries-close-btn'>X</button>
                {itineraries.map((itinerary) => (
                    <Link to={`/itinerary/${itinerary.itinerary_id}`} key={itinerary.itinerary_id}>
                        <section className="display-itineraries--card"
                            key={itinerary.itinerary_id}>
                            <h3>{itinerary.itinerary_name}</h3>
                            <h5>{itinerary.itinerary_descr}</h5>
                            <h4>{itinerary.user.username}</h4>
                        </section>
                    </Link>
                ))}
            </div>
        </main> 
     );
}
 
export default DisplayItineraries;