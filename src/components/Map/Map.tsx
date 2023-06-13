// // position keys

import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "./Map.scss";

interface Location {
  id: number;
  loc_coords: [number, number];
  loc_name: string;
  loc_descr_en: string;
  loc_descr_ja: string;
  loc_tags: string[];
}

interface MapProps {
  handleLocationData: (locationData: Location) => void;
}

const defaultPosition: [number, number] = [35.664035, 139.698212]; // this is Tokyo

const initialLocation: Location = {
  id: 0,
  loc_coords: [0, 0],
  loc_name: "",
  loc_descr_en: "",
  loc_descr_ja: "",
  loc_tags: [],
};

const Map: React.FC<MapProps> = ({ handleLocationData }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [newLocationData, setNewLocationData] =
    useState<Location>(initialLocation);
  const [showPopup, setShowPopup] = useState(false);

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
  // console.log("newLocations", newLocationData);
  // console.log("locations", locations);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { id, loc_coords, loc_name, loc_descr_en, loc_descr_ja, loc_tags } =
      newLocationData;

    if (loc_name.trim() !== "") {
      const newLocation: Location = {
        id,
        loc_coords,
        loc_name,
        loc_descr_en,
        loc_descr_ja,
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

  const AddMarkerToMap = () => {
    useMapEvents({
      click: (e) => {
        const latitude = e.latlng.lat;
        const longitude = e.latlng.lng;

        // console.log("Location coordinates on click:", latitude, longitude);

        const newLocation: Location = {
          id: locations.length + 1,
          loc_coords: [latitude, longitude],
          loc_name: newLocationData.loc_name,
          loc_descr_en: newLocationData.loc_descr_en,
          loc_descr_ja: newLocationData.loc_descr_ja,
          loc_tags: newLocationData.loc_tags,
        };

        // console.log("New location:", newLocation);

        setNewLocationData((prevData) => ({
          id: locations.length + 1,
          loc_coords: [latitude, longitude],
          loc_name: "",
          loc_descr_en: "",
          loc_descr_ja: "",
          loc_tags: [],
        }));
        setShowPopup(true);
      },
    });
    return null;
  };

  //Mapbox token
  const mapboxTileUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2luam90ZWFtIiwiYSI6ImNsaXRlaGJ5ZDFsbmQzcW8xaHhyOHR5NXkifQ.r9gFkgZc8xpSvE1rID2lHg`;

  return (
    <div className="map-container">
      <MapContainer
        center={defaultPosition}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url={mapboxTileUrl}
          attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
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
                <input
                  type="text"
                  name="loc_tags"
                  value={newLocationData.loc_tags}
                  onChange={handleInputChange}
                />
              </label>
              <button type="submit">Add Location</button>
            </form>
          </Popup>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
