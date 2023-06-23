import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useRef, useEffect } from "react";
import { LatLngTuple, LatLngBounds } from "leaflet";
import MapUpdater from "./MapUpdater";
import "./ReadOnlyMap.scss";
import { Location } from "../../../globals"

//Retained for reference on account of the modification to avgLat & avgLong
// interface Location {
//   id: number;
//   location: {
//     loc_coords: [number, number];
//   };
//   loc_name: string;
//   loc_descr_en: string;
// }

interface MapProps {
  locations: {
    itinerary_locations: Location[];
  };
}
const defaultPosition: [number, number] = [35.664035, 139.698212]; // this is Tokyo

const ReadOnlyMap: React.FC<MapProps> = ({ locations }) => {
  const { itinerary_locations } = locations;
  //   console.log("Locations", itinerary_locations);
  const [activeLocation, setActiveLocation] = useState<Location | any>(null);

  const activeLocationRef = useRef<Location | null>(null);

  //setting zoomout limit to Japan
  const japanBounds: [LatLngTuple, LatLngTuple] = [
    [20.214581, 122.71447] as LatLngTuple, // Southwest coordinates
    [45.55783, 154.00259] as LatLngTuple, // Northeast coordinates
  ];
  const japanLatLngBounds = new LatLngBounds(japanBounds);

  const handleMarkerClick = (location: Location) => {
    setActiveLocation(location);
    activeLocationRef.current = location;
  };

  //   console.logging activeLocation purposes
  useEffect(() => {
    if (activeLocation) {
      console.log("Active Location:", activeLocation);
    }
  }, [activeLocation]);

  let avgLat = 0;
  let avgLng = 0;

  if (itinerary_locations && itinerary_locations.length > 0) {
    for (const location of itinerary_locations) {
      avgLat += location.loc_coords[0]; //Modified from location.location.loc_coords[0] per SubmitMap.tsx
      avgLng += location.loc_coords[1]; //Modified from location.location.loc_coords[1] per SubmitMap.tsx
    }

    avgLat /= itinerary_locations.length;
    avgLng /= itinerary_locations.length;
  }
  const averagePosition: [number, number] = [avgLat, avgLng];
  //   console.log("Average Position", averagePosition);
  const mapboxTileUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2luam90ZWFtIiwiYSI6ImNsaXRlaGJ5ZDFsbmQzcW8xaHhyOHR5NXkifQ.r9gFkgZc8xpSvE1rID2lHg`;

  return (
    <div className="map-container">
      <MapContainer
        center={defaultPosition}
        zoom={13}
        style={{ height: "230px", width: "100%" }}
        maxBounds={japanBounds}
        minZoom={5}
      >
        <MapUpdater
          newCenter={
            averagePosition.length > 0 ? averagePosition : defaultPosition
          }
        />
        <TileLayer
          url={mapboxTileUrl}
          attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
          bounds={japanLatLngBounds}
        />
        {itinerary_locations &&
          itinerary_locations.map((location: any) => (
            <Marker
              key={location.id}
              position={location.location.loc_coords}
              eventHandlers={{
                click: () => {
                  handleMarkerClick(location);
                },
              }}
            >
              <Popup>
                {activeLocationRef.current &&
                  activeLocationRef.current.id === location.id && (
                    <div>
                      <h2>{activeLocation.location.loc_name}</h2>
                      <p>{activeLocation.location.loc_descr_en}</p>
                    </div>
                  )}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default ReadOnlyMap;
