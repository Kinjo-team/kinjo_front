import React from "react";
import { LatLngTuple, LatLngBounds } from "leaflet";
import { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import FlyTo from "../../FlyTo/FlyTo";

interface Visited_map {
  id: number;
  visited_coords: [number, number];
  visited_name: string;
  visited_descr: string;
}

interface MapProps {
  userData: any;
  visitedPlaces: Visited_map[];
}

//default position for Japan
const defaultPosition: [number, number] = [36.2048, 138.2529];

//setting zoomout limit to Japan
const japanBounds: [LatLngTuple, LatLngTuple] = [
  [20.214581, 122.71447] as LatLngTuple, // Southwest coordinates
  [45.55783, 154.00259] as LatLngTuple, // Northeast coordinates
];

const japanLatLngBounds = new LatLngBounds(japanBounds);

const initialLocation: Visited_map = {
  id: 0,
  visited_coords: [0, 0],
  visited_name: "",
  visited_descr: "",
};

const DMap: React.FC<MapProps> = ({ userData, visitedPlaces }) => {
  const [locations, setLocations] = useState<Visited_map[]>([]);
  const [newLocationData, setNewLocationData] =
    useState<Visited_map>(initialLocation);
  const [showPopup, setShowPopup] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  //useStates tied to FlyTo logic (centerPosition & zoomLevel)
  const [flyToPosition, setFlyToPosition] = useState<[number, number] | null>(
    null
  );
  const [flyToZoomLevel, setFlyToZoomLevel] = useState<number>(13);
  const [triggerFlyTo, setTriggerFlyTo] = useState(false);

  //useState tied to geolocation logic
  const [userLocation, setUserLocation] = useState<Visited_map | null>(null);

  useEffect(() => {
    setLocations(visitedPlaces);
  }, [visitedPlaces]);

  useEffect(() => {
    if (triggerFlyTo) {
      setTriggerFlyTo(false);
    }
  }, [triggerFlyTo]);

  //FlyTo component logic for SearchBar & Geolocation
  const flyToLocation = (position: [number, number], zoom: number) => {
    setFlyToPosition(position);
    setFlyToZoomLevel(zoom);
    setTriggerFlyTo(true);
  };

  // Mapbox tile layer API token
  const mapboxTileUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2luam90ZWFtIiwiYSI6ImNsaXRlaGJ5ZDFsbmQzcW8xaHhyOHR5NXkifQ.r9gFkgZc8xpSvE1rID2lHg`;

  const handleInputChange = <T extends HTMLInputElement | HTMLTextAreaElement>(
    e: React.ChangeEvent<T>
  ) => {
    const { name, value } = e.target;
    setNewLocationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = `${process.env.REACT_APP_BACKEND_URL}visited_map`;

    const postData = {
      ...newLocationData,
      firebase_uuid: userData.firebase_uuid,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setNewLocationData(data);
      }
    } catch (error) {
      console.error(error);
    }
    setLocations((prevLocations) => [...prevLocations, postData]);
    resetNewLocationData(true);
  };

  const resetNewLocationData = (formSubmitted: any) => {
    if (!formSubmitted) {
      // Set newLocationData back to the initial state.
      setNewLocationData(initialLocation);
    }
    setShowPopup(false);
  };

  // Add shapes & markers to map logic

  const AddMarkerToMap = () => {
    useMapEvents({
      click: (e) => {
        const newId = locations.length + 1;
        setNewLocationData(initialLocation); // resetting the form data here
        setNewLocationData((prevData) => ({
          ...prevData,
          id: newId,
          visited_coords: [e.latlng.lat, e.latlng.lng],
        }));
        setShowPopup(true);
      },
    });
    return null;
  };

  //Delete markers logic
  const handleDeleteMarker = (id: number) => {
    setLocations((prevLocations) =>
      prevLocations.filter((loc) => loc.id !== id)
    );
  };

  // Geocoding logic for searchbar
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const inputElement = searchInputRef.current;
    if (inputElement && inputElement.value) {
      const query = inputElement.value;
      const apiKey = "0be542e0feab4cc9a51ccfc191f4dcc3";
      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            query
          )}&key=${apiKey}&language=en&pretty=1`
        );
        const data = await response.json();
        const { lat, lng } = data.results[0].geometry;
        flyToLocation([lat, lng], 15);
      } catch (error) {
        console.error("Error fetching geocoding data:", error);
      }

      inputElement.value = "";
    }
  };

  //Geolocation logic
  const handleUseMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        flyToLocation([latitude, longitude], 16);
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  };

  return (
    <div className="create-map-container">
      <form className="create-map-searchbar" onSubmit={handleSearch}>
        <input type="text" placeholder="Search location" ref={searchInputRef} />
        <button type="submit">Search</button>
        <button type="button" onClick={handleUseMyLocation}>
          Use my location
        </button>
      </form>
      <MapContainer
        center={defaultPosition}
        zoom={5}
        style={{ height: "500px", width: "100%" }}
        maxBounds={japanBounds}
      >
        <TileLayer
          url={mapboxTileUrl}
          attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
          bounds={japanLatLngBounds}
        />
        <AddMarkerToMap />
        {locations.map((location) => (
          <Marker key={location.id} position={location.visited_coords}>
            <Popup className="request-popup">
              <div className="created-marker-popup">
                <h3>{location.visited_name}</h3>
                <p>{location.visited_descr}</p>
                <button
                  className="popup-delete-btn"
                  onClick={() => handleDeleteMarker(location.id)}
                >
                  Delete
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
        {userLocation && (
          <Marker position={userLocation.visited_coords} interactive={false}>
            <Popup>{userLocation.visited_name}</Popup>
          </Marker>
        )}
        {newLocationData.visited_coords && (
          <Marker
            position={newLocationData.visited_coords}
            interactive={false}
          />
        )}
        {showPopup && (
          <Popup
            position={newLocationData.visited_coords}
            closeOnClick={false}
            eventHandlers={{
              remove: () => resetNewLocationData(false),
            }}
            className="request-popup"
          >
            <form className="popup-form" onSubmit={handleSubmit}>
              <div className="popup-form-input">
                <label htmlFor="visited_name">PLACE NAME</label>
                <input
                  type="text"
                  name="visited_name"
                  id="visited_name"
                  placeholder="Tanaka's Coffee"
                  value={newLocationData.visited_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="popup-form-input">
                <label htmlFor="visited_descr">PLACE DESCRIPTION</label>
                <textarea
                  name="visited_descr"
                  id="visited_descr"
                  placeholder="A cozy coffee shop with a great view of Mt. Fuji."
                  value={newLocationData.visited_descr}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button className="popup-submit-btn" type="submit">
                Add
              </button>
            </form>
          </Popup>
        )}
        {triggerFlyTo && (
          <FlyTo position={flyToPosition} zoom={flyToZoomLevel} />
        )}
      </MapContainer>
    </div>
  );
};

export default DMap;
