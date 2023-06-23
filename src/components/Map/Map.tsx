import React from "react";
import L from "leaflet";
import { LatLngTuple, LatLngBounds } from "leaflet";
import { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import TagsInput from "./TagsInput";
import FlyTo from "../FlyTo/FlyTo";
import DrawControl from "../DrawControl/DrawControl";

import "./Map.scss";
import UploadWidget from "../UploadWidget/UploadWidget";

import { Location } from "../../../globals"

// interface Location {
//   id: number;
//   loc_coords: [number, number];
//   loc_name: string;
//   loc_descr_en: string;
//   loc_tags: string[];
//   image_urls: string[];
// }

interface MapProps {
  handleLocationData: (locationData: Location) => void;
  handleCircleCreated: (
    latitude: number,
    longitude: number,
    radius: number,
    layer: any,
    featureGroup: any
  ) => void;
  circleCreated: boolean;
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
  loc_image_url: "",
};

const Map: React.FC<MapProps> = ({
  handleLocationData,
  handleCircleCreated,
}) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [newLocationData, setNewLocationData] =
    useState<Location>(initialLocation);
  const [showPopup, setShowPopup] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [imgUrl, setImgUrl] = useState<string>("");

  //useStates tied to FlyTo logic (centerPosition & zoomLevel)
  const [flyToPosition, setFlyToPosition] = useState<[number, number] | null>(
    null
  );
  const [flyToZoomLevel, setFlyToZoomLevel] = useState<number>(13);
  const [triggerFlyTo, setTriggerFlyTo] = useState(false);

  //useState tied to geolocation logic
  const [userLocation, setUserLocation] = useState<Location | null>(null);

  //useState tied to geometric shapes logic
  const [drawnShape, setDrawnShape] = useState<L.Layer | null>(null);

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

  // HANDLERS
  const handleInputChange = <T extends HTMLInputElement | HTMLTextAreaElement>(
    e: React.ChangeEvent<T>
  ) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setImgUrl("");
    const { id, loc_coords, loc_name, loc_descr_en, loc_tags, loc_image_url } =
      newLocationData;

    // Check if loc_name is not empty
    if (loc_name.trim() !== "") {
      const newLocation: Location = {
        id,
        loc_coords,
        loc_name,
        loc_descr_en,
        loc_tags,
        loc_image_url,
      };
      const existingLocationIndex = locations.findIndex((loc) => loc.id === id);

      //Edit logic
      if (existingLocationIndex > -1) {
        setLocations((prevLocations) =>
          prevLocations.map((loc, index) =>
            index === existingLocationIndex ? newLocation : loc
          )
        );
      } else {
        setLocations((prevLocations) => [...prevLocations, newLocation]);
      }
      resetNewLocationData(true);
      handleLocationData(newLocation);
    }
  };

  const resetNewLocationData = (formSubmitted: boolean) => {
    if (!formSubmitted) {
      // Set newLocationData back to the initial state.
      setNewLocationData(initialLocation);
    }
    setShowPopup(false);
  };

  // Add shapes & markers to map logic

  const isPointInShape = (point: L.LatLng, shape: L.Layer): boolean => {
    if (shape instanceof L.Circle) {
      return shape.getLatLng().distanceTo(point) <= shape.getRadius();
    }
    return false;
  };

  const AddMarkerToMap = () => {
    useMapEvents({
      click: (e) => {
        if (drawnShape && isPointInShape(e.latlng, drawnShape)) {
          const newId = locations.length + 1;
          setNewLocationData(initialLocation); // resetting the form data here
          setNewLocationData((prevData) => ({
            ...prevData,
            id: newId,
            loc_coords: [e.latlng.lat, e.latlng.lng],
          }));
          setImgUrl("");
          setShowPopup(true);
        }
      },
    });

    return null;
  };

  // Delete shapes logic
  const handleShapeDeleted = (shapes: L.Layer[]) => {
    shapes.forEach((shape) => {
      const newLocationLatLng = new L.LatLng(
        newLocationData.loc_coords[0],
        newLocationData.loc_coords[1]
      );
      if (isPointInShape(newLocationLatLng, shape)) {
        resetNewLocationData(true);
      }
    });
    setDrawnShape(null);
  };

  //Delete markers logic
  const handleDeleteMarker = (id: number) => {
    setLocations((prevLocations) =>
      prevLocations.filter((loc) => loc.id !== id)
    );
  };

  //Edit markers logic
  const handleEditMarker = (id: number) => {
    const locationToEdit = locations.find((loc) => loc.id === id);
    if (locationToEdit) {
      setNewLocationData(locationToEdit);
      setShowPopup(true);
    }
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

  // Sets new img
  function insertNewImgUrl(url: string) {
    setImgUrl(url);
  }

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
            <Popup className="request-popup">
              <div className="created-marker-popup">
                <h3>{location.loc_name}</h3>
                <p>{location.loc_descr_en}</p>
                <p>Tags: {location.loc_tags.join(" ")}</p>
                <img
                  className="popup-img"
                  src={location.loc_image_url}
                  alt="location"
                />
                <button
                  className="popup-edit-btn"
                  onClick={() => handleEditMarker(location.id)}
                >
                  Edit
                </button>
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
          <Marker position={userLocation.loc_coords} interactive={false}>
            <Popup>{userLocation.loc_name}</Popup>
          </Marker>
        )}
        <Marker position={newLocationData.loc_coords} interactive={false} />
        {showPopup && (
          <Popup
            position={newLocationData.loc_coords}
            closeOnClick={false}
            eventHandlers={{
              remove: () => resetNewLocationData(false),
            }}
            className="request-popup"
          >
            <form className="popup-form" onSubmit={handleSubmit}>
              <div className="popup-form-input">
                <label htmlFor="loc_name">PLACE NAME</label>
                <input
                  type="text"
                  name="loc_name"
                  id="loc_name"
                  placeholder="Tanaka's Coffee"
                  value={newLocationData.loc_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="popup-form-input">
                <label htmlFor="loc_descr_en">PLACE DESCRIPTION</label>
                <textarea
                  name="loc_descr_en"
                  id="loc_descr_en"
                  rows={6}
                  placeholder="A cozy coffee shop with a great view of Mt. Fuji."
                  value={newLocationData.loc_descr_en}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="popup-form-input">
                <label htmlFor="tags_input">PLACE TAGS</label>
                <TagsInput
                  onTagsChange={(tags) => {
                    setNewLocationData((prevData) => ({
                      ...prevData,
                      loc_tags: tags,
                    }));
                  }}
                />
              </div>
              {imgUrl !== "" && (
                <img className="marker-img" src={imgUrl} alt="" />
              )}
              <UploadWidget
                insertNewImgUrl={insertNewImgUrl}
                text="Upload Image"
                handleImageUrl={(url) => {
                  // handleImageUrl(url);
                  setNewLocationData((prevData) => ({
                    ...prevData,
                    loc_image_url: url,
                  }));
                }}
              />
              <button className="popup-submit-btn" type="submit">
                Add
              </button>
            </form>
          </Popup>
        )}
        {triggerFlyTo && (
          <FlyTo position={flyToPosition} zoom={flyToZoomLevel} />
        )}
        <DrawControl
          handleCircleCreated={handleCircleCreated}
          onShapeCreated={setDrawnShape}
          onShapeDeleted={handleShapeDeleted}
          circleCreated={false}
        />
      </MapContainer>
    </div>
  );
};

export default Map;
