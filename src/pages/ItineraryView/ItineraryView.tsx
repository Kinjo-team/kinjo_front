import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LocationCard from "../../components/LocationCard/LocationCard";
import LocationPopUp from "../../components/LocationPopUp/LocationPopUp";
import i18n from "../../i18n";

import "./ItineraryView.scss";


const ItineraryView = () => {
    const { id } = useParams();
    const [selectedLocation, setSelectedLocation] = useState<any>(null);
    const [itinerary, setItinerary] = useState<any>({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItinerary = async () => {
            const response = await fetch(`http://localhost:8000/itineraries/id/${id}`);
            const data = await response.json();
            console.log(data);
            setItinerary(data);
            console.log(i18n.language)
        }
        fetchItinerary();
    }, [id])

    // HANDLERS
    function goBack() {
        navigate(-1);
    }
    
    function closePopup() { // New function to close the popup
        setSelectedLocation(null);
    }
    // FUNCTIONS
    function selectLocation(location: any) {
        setSelectedLocation(location);
    }


  return (
    <>
        <main className="itineraryview--container">
            <button onClick={goBack}>Back</button>
            <section className="info--container">
                <article>
                    <h1>{itinerary.itinerary_name}</h1>
                    <p>{itinerary.itinerary_descr}</p>
                </article>
            </section>
            <section className="cards--container">
                {itinerary.itinerary_locations && itinerary.itinerary_locations.map((location: any) => (
                    <LocationCard key={location.id} location={location} handleClick={() => selectLocation(location)} />))}
            </section>
            {selectedLocation && <LocationPopUp location={selectedLocation} onClose={closePopup} />}
        </main>
    </>
  )
}

export default ItineraryView