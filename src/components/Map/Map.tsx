import React from "react";
import { LatLngTuple, LatLngBounds } from "leaflet";
import { useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import TagsInput from "./TagsInput";
import FlyTo from "../FlyTo/FlyTo";
import "./Map.scss";

interface Location {
  id: number;
  loc_coords: [number, number];
  loc_name: string;
  loc_descr_en: string;
  loc_tags: string[];
}

interface MapProps {
  handleLocationData: (locationData: Location) => void;
}

//default position for Tokyo
const defaultPosition: [number, number] = [35.664035, 139.698212];

//setting zoomout limit to Japan
const japanBounds: [LatLngTuple, LatLngTuple] = [
  [20.214581, 122.71447] as LatLngTuple, // Southwest coordinates
  [45.55783, 154.00259] as LatLngTuple, // Northeast coordinates
];
const japanLatLngBounds = new LatLngBounds(japanBounds);

const initialLocation: Location = {
  id: 0,
  loc_coords: [0, 0],
  loc_name: "",
  loc_descr_en: "",
  loc_tags: [],
};

const Map: React.FC<MapProps> = ({ handleLocationData }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [newLocationData, setNewLocationData] =
    useState<Location>(initialLocation);
  const [showPopup, setShowPopup] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  //useStates tied to FlyTo logic (centerPosition & zoomLevel)
  const [centerPosition, setCenterPosition] = useState<[number, number] | null>(
    null
  );
  const [zoomLevel, setZoomLevel] = useState<number>(13);

  //useState tied to Geolocation logic
  const [userLocation, setUserLocation] = useState<Location | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "loc_tags") {
      const tagsArray = value.split(" ").map((tag) => tag.trim());
      setNewLocationData((prevData) => ({
        ...prevData,
        [name]: tagsArray,
      }));
    } else {
      setNewLocationData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { id, loc_coords, loc_name, loc_descr_en, loc_tags } =
      newLocationData;

    if (loc_name.trim() !== "") {
      const newLocation: Location = {
        id,
        loc_coords,
        loc_name,
        loc_descr_en,
        loc_tags,
      };
      setLocations((prevLocations) => [...prevLocations, newLocation]);
      resetNewLocationData();
      handleLocationData(newLocation);
    }
  };

  const resetNewLocationData = () => {
    setNewLocationData(initialLocation);
    setShowPopup(false);
  };

  // Add marker to map logic
  const AddMarkerToMap = () => {
    useMapEvents({
      click: (e) => {
        const latitude = e.latlng.lat;
        const longitude = e.latlng.lng;

        setNewLocationData((prevData) => ({
          id: locations.length + 1,
          loc_coords: [latitude, longitude],
          loc_name: "",
          loc_descr_en: "",
          loc_tags: [],
        }));
        setShowPopup(true);
      },
      locationfound: (e) => {
        const { lat, lng } = e.latlng;
        setCenterPosition([lat, lng]);
        setZoomLevel(13);
      },
    });

    return null;
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

        if (response.ok) {
          const data = await response.json();

          if (data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry;
            const centerCoordinates: [number, number] = [lat, lng];
            setNewLocationData((prevData) => ({
              ...prevData,
              loc_coords: centerCoordinates,
            }));
            setCenterPosition(centerCoordinates);
            setZoomLevel(13);
          } else {
            console.log("No results found");
          }
        } else {
          console.error("Error fetching geocoding data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching geocoding data:", error);
      }

      inputElement.value = "";
    }
  };

  //Geolocation logic
  const locateUser = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenterPosition([latitude, longitude]);
          setZoomLevel(13);

          // Set user location
          setUserLocation({
            id: -1,
            loc_coords: [latitude, longitude],
            loc_name: "My Location",
            loc_descr_en: "",
            loc_tags: [],
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation not supported in this browser");
    }
  };

  // Mapbox tile layer
  const mapboxTileUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2luam90ZWFtIiwiYSI6ImNsaXRlaGJ5ZDFsbmQzcW8xaHhyOHR5NXkifQ.r9gFkgZc8xpSvE1rID2lHg`;

  return (
    <div className="map-container">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Search location" ref={searchInputRef} />
        <button type="submit">Search</button>
      </form>
      <button onClick={locateUser}>Use My Location</button>
      <MapContainer
        center={defaultPosition}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
        maxBounds={japanBounds}
        minZoom={5}
      >
        <TileLayer
          url={mapboxTileUrl}
          attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
          bounds={japanLatLngBounds}
        />
        <AddMarkerToMap />
        {locations.map((location) => (
          <Marker key={location.id} position={location.loc_coords}>
            <Popup>
              <h3>{location.loc_name}</h3>
              <p>{location.loc_descr_en}</p>
              <p>Tags: {location.loc_tags.join(" ")}</p>
            </Popup>
          </Marker>
        ))}
        {userLocation && (
          <Marker position={userLocation.loc_coords} interactive={false}>
            <Popup>{userLocation.loc_name}</Popup>
          </Marker>
        )}
        <Marker position={newLocationData.loc_coords} interactive={false} />
        {showPopup && (
          <Popup position={newLocationData.loc_coords} closeOnClick={false}>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="loc_name"
                  value={newLocationData.loc_name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Description:
                <input
                  type="text"
                  name="loc_descr_en"
                  value={newLocationData.loc_descr_en}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Tags:
                <TagsInput
                  onTagsChange={(tags) => {
                    setNewLocationData((prevData) => ({
                      ...prevData,
                      loc_tags: tags,
                    }));
                  }}
                />
              </label>
              <button type="submit">Add Location</button>
            </form>
          </Popup>
        )}
        {centerPosition && <FlyTo position={centerPosition} zoom={zoomLevel} />}
      </MapContainer>
    </div>
  );
};

export default Map;
