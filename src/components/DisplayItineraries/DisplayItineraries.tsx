import React from 'react';
import { Link } from "react-router-dom";
import './DisplayItineraries.scss';

interface DisplayItinerariesProps {
    itineraries: any[];
    toggleShowResults: () => void;
    searchValue: string;
  }

const DisplayItineraries: React.FC<DisplayItinerariesProps> = ({ itineraries, toggleShowResults, searchValue }) => {

    return (
        <main className="display-itineraries--overlay">
            <div className='display-itineraries--container'>
                <button onClick={toggleShowResults} className='display-itineraries-close-btn'>X</button>
                <h1><span>{itineraries.length}</span> search results matching <span className='search-value'>"{searchValue}"</span></h1>
                {itineraries.map((itinerary) => (
                    <Link to={`/itinerary/${itinerary.itinerary_id}`} key={itinerary.itinerary_id}>
                        <section className="display-itineraries--card"
                            key={itinerary.itinerary_id}>
                            <div className="part1">
                                <h3>{itinerary.itinerary_name}</h3>
                                <img src={itinerary.itinerary_image_url} alt="" />
                            </div>
                            <div className='part2'>
                                <p>{itinerary.itinerary_descr}</p>
                                <span className='tags-container'>Tags: {itinerary.itinerary_tags.map((tag : string) => {
                                    return (<div className='tag'>{tag}</div>)
                                })}</span>
                            </div>
                            <div className='part3'>
                                <img src={itinerary.user.user_img} alt="" />
                                <h4>{itinerary.user.username}</h4>
                            </div>
                        </section>
                    </Link>
                ))}
                <button onClick={toggleShowResults} className='close-btn'>Close</button>
            </div>
        </main> 
     );
}
 
export default DisplayItineraries;