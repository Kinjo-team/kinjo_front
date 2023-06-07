import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

interface Location {
  id: number;
  position: [number, number];
  name: string;
  description: string;
  tags: string;
}

const Map: React.FC = () => {
  const defaultPosition: [number, number] = [35.664035, 139.698212]; //this is just Tokyo for now
  const [locations, setLocations] = useState<Location[]>([]);
  const [newLocationData, setNewLocationData] = useState<Location>({
    id: 0,
    position: [0, 0],
    name: "",
    description: "",
    tags: "",
  });

  const AddMarkerToMap = () => {
    const map = useMapEvents({
      click: (e) => {
        const latitude = e.latlng.lat;
        const longitude = e.latlng.lng;

        console.log("Location coordinates on click:", latitude, longitude);

        setNewLocationData({
          id: locations.length + 1,
          position: [latitude, longitude],
          name: "",
          description: "",
          tags: "",
        });
      },
    });
    return null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLocationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { id, position, name, description, tags } = newLocationData;

    if (name.trim() !== "") {
      const newLocation: Location = {
        id,
        position,
        name,
        description,
        tags,
      };
      setLocations([...locations, newLocation]);

      setNewLocationData({
        id: 0,
        position: [0, 0],
        name: "",
        description: "",
        tags: "",
      });
    }
  };

  const handlePopupClose = () => {
    setNewLocationData({
      id: 0,
      position: [0, 0],
      name: "",
      description: "",
      tags: "",
    });
  };

  return (
    <MapContainer
      center={defaultPosition}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <AddMarkerToMap />
      {locations.map((location) => (
        <Marker key={location.id} position={location.position}>
          <Popup>
            <h3>{location.name}</h3>
            <p>{location.description}</p>
            <p>Tags: {location.tags}</p>
          </Popup>
        </Marker>
      ))}
      <Marker position={newLocationData.position} interactive={false} />
      {newLocationData.position[0] !== 0 && (
        <Popup position={newLocationData.position} closeOnClick={false}>
          <form onSubmit={handleFormSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={newLocationData.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={newLocationData.description}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Tags:
              <input
                type="text"
                name="tags"
                value={newLocationData.tags}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit">Add Location</button>
          </form>
          <button onClick={handlePopupClose}>Cancel</button>
        </Popup>
      )}
    </MapContainer>
  );
};

export default Map;
