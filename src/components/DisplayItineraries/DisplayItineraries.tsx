import React from 'react';
import './DisplayItineraries.scss';

interface DisplayItinerariesProps {
    itineraries: any[];
  }

const DisplayItineraries: React.FC<DisplayItinerariesProps> = ({ itineraries }) => {

    return (
        <main className="display-itineraries--container">
            {itineraries.map((itinerary) => (
            <section className="display-itineraries--card"
                key={itinerary.itinerary_id}>
                <h3>{itinerary.itinerary_name}</h3>
                <h5>{itinerary.itinerary_descr}</h5>
                <h4>{itinerary.user.username}</h4>
            </section>
            ))}
        </main> 
     );
}
 
export default DisplayItineraries;