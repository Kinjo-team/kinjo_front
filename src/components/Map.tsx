// position keys

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
  tags: string[];
}

const defaultPosition: [number, number] = [35.664035, 139.698212]; // this is Tokyo

const initialLocation: Location = {
  id: 0,
  position: [0, 0],
  name: "",
  description: "",
  tags: [],
};

const Map: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [newLocationData, setNewLocationData] =
    useState<Location>(initialLocation);
  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "tags") {
      const tagsArray = value.split(",").map((tag) => tag.trim());
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
    const { id, position, name, description, tags } = newLocationData;

    if (name.trim() !== "") {
      const newLocation: Location = {
        id,
        position,
        name,
        description,
        tags,
      };
      setLocations((prevLocations) => [...prevLocations, newLocation]);
      resetNewLocationData();
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

        console.log("Location coordinates on click:", latitude, longitude);

        const newLocation: Location = {
          id: locations.length + 1,
          position: [latitude, longitude],
          name: newLocationData.name,
          description: newLocationData.description,
          tags: newLocationData.tags,
        };

        console.log("New location:", newLocation);

        setNewLocationData((prevData) => ({
          id: locations.length + 1,
          position: [latitude, longitude],
          name: "",
          description: "",
          tags: [],
        }));
        setShowPopup(true);
      },
    });
    return null;
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
            <p>Tags: {location.tags.join(", ")}</p>
          </Popup>
        </Marker>
      ))}
      <Marker position={newLocationData.position} interactive={false} />
      {showPopup && (
        <Popup position={newLocationData.position} closeOnClick={false}>
          <form onSubmit={handleSubmit}>
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
        </Popup>
      )}
    </MapContainer>
  );
};

export default Map;

// latitude and longitude keys

// import { useState } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   useMapEvents,
// } from "react-leaflet";

// interface Location {
//   id: number;
//   latitude: number;
//   longitude: number;
//   name: string;
//   description: string;
//   tags: string[];
// }

// const defaultPosition: [number, number] = [35.664035, 139.698212]; // this is Tokyo

// const initialLocation: Location = {
//   id: 0,
//   latitude: 0,
//   longitude: 0,
//   name: "",
//   description: "",
//   tags: [],
// };

// const Map: React.FC = () => {
//   const [locations, setLocations] = useState<Location[]>([]);
//   const [newLocationData, setNewLocationData] =
//     useState<Location>(initialLocation);
//   const [showPopup, setShowPopup] = useState(false);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     if (name === "tags") {
//       const tagsArray = value.split(",").map((tag) => tag.trim());
//       setNewLocationData((prevData) => ({
//         ...prevData,
//         [name]: tagsArray,
//       }));
//     } else {
//       setNewLocationData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const { id, latitude, longitude, name, description, tags } =
//       newLocationData;

//     if (name.trim() !== "") {
//       const newLocation: Location = {
//         id,
//         latitude,
//         longitude,
//         name,
//         description,
//         tags,
//       };
//       setLocations((prevLocations) => [...prevLocations, newLocation]);
//       resetNewLocationData();
//     }
//   };

//   const resetNewLocationData = () => {
//     setNewLocationData(initialLocation);
//     setShowPopup(false);
//   };

//   const AddMarkerToMap = () => {
//     useMapEvents({
//       click: (e) => {
//         const latitude = e.latlng.lat;
//         const longitude = e.latlng.lng;

//         console.log("Location coordinates on click:", latitude, longitude);

//         setNewLocationData((prevData) => ({
//           id: locations.length + 1,
//           latitude,
//           longitude,
//           name: "",
//           description: "",
//           tags: [],
//         }));
//         setShowPopup(true);
//       },
//     });
//     return null;
//   };

//   return (
//     <MapContainer
//       center={defaultPosition}
//       zoom={13}
//       style={{ height: "500px", width: "100%" }}
//     >
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       <AddMarkerToMap />
//       {locations.map((location) => (
//         <Marker
//           key={location.id}
//           position={[location.latitude, location.longitude]}
//         >
//           <Popup>
//             <h3>{location.name}</h3>
//             <p>{location.description}</p>
//             <p>Tags: {location.tags.join(", ")}</p>
//           </Popup>
//         </Marker>
//       ))}
//       <Marker
//         position={[newLocationData.latitude, newLocationData.longitude]}
//         interactive={false}
//       />
//       {showPopup && (
//         <Popup
//           position={[newLocationData.latitude, newLocationData.longitude]}
//           closeOnClick={false}
//         >
//           <form onSubmit={handleSubmit}>
//             <label>
//               Name:
//               <input
//                 type="text"
//                 name="name"
//                 value={newLocationData.name}
//                 onChange={handleInputChange}
//                 required
//               />
//             </label>
//             <label>
//               Description:
//               <input
//                 type="text"
//                 name="description"
//                 value={newLocationData.description}
//                 onChange={handleInputChange}
//               />
//             </label>
//             <label>
//               Tags:
//               <input
//                 type="text"
//                 name="tags"
//                 value={newLocationData.tags}
//                 onChange={handleInputChange}
//               />
//             </label>
//             <button type="submit">Add Location</button>
//           </form>
//         </Popup>
//       )}
//     </MapContainer>
//   );
// };

// export default Map;
