import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useRef, useEffect } from "react";
import MapUpdater from "./MapUpdater";
import "./ReadOnlyMap.scss";

interface Location {
  loc_id: number;
  location: {
    loc_coords: [number, number];
  };
  loc_coords: [number, number];
  loc_name: string;
  loc_descr_en: string;
}

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
      avgLat += location.loc_coords[0];
      avgLng += location.loc_coords[1];
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
      >
        <MapUpdater
          newCenter={
            averagePosition.length > 0 ? averagePosition : defaultPosition
          }
        />
        <TileLayer
          url={mapboxTileUrl}
          attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
        />
        {itinerary_locations &&
          itinerary_locations.map((location: any) => (
            <Marker
              key={location.loc_id}
              position={location.loc_coords}
              eventHandlers={{
                click: () => {
                  handleMarkerClick(location);
                },
              }}
            >
              <Popup>
                {activeLocationRef.current &&
                  activeLocationRef.current.loc_id === location.loc_id && (
                    <div>
                      <h2>{activeLocation.loc_name}</h2>
                      <p>{activeLocation.loc_descr_en}</p>
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
