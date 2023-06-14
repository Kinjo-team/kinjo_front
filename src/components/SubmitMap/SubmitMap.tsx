import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useRef, useEffect } from "react";
import SubmitMapUpdater from "./SubmitMapUpdater";

interface Location {
  id: number;
  loc_coords: [number, number];
  loc_descr_en: string;
  loc_name: string;
  loc_tags: string[];
}

interface MapProps {
  locations: {
    locationData: Location[];
  };
}
const defaultPosition: [number, number] = [35.664035, 139.698212]; // this is Tokyo

const SubmitMap: React.FC<MapProps> = ({ locations }) => {
  const { locationData } = locations;
  //   console.log("Locations", locationData);
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

  if (locationData && locationData.length > 0) {
    for (const location of locationData) {
      avgLat += location.loc_coords[0];
      avgLng += location.loc_coords[1];
    }

    avgLat /= locationData.length;
    avgLng /= locationData.length;
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
        <SubmitMapUpdater
          newCenter={
            averagePosition.length > 0 ? averagePosition : defaultPosition
          }
        />
        <TileLayer
          url={mapboxTileUrl}
          attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
        />
        {locationData &&
          locationData.map((location: any) => (
            <Marker
              key={location.id}
              position={location.loc_coords}
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

export default SubmitMap;
