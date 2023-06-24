import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useRef } from "react";
import { LatLngTuple, LatLngBounds } from "leaflet";
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

//setting zoomout limit to Japan
const japanBounds: [LatLngTuple, LatLngTuple] = [
  [20.214581, 122.71447] as LatLngTuple, // Southwest coordinates
  [45.55783, 154.00259] as LatLngTuple, // Northeast coordinates
];
const japanLatLngBounds = new LatLngBounds(japanBounds);

const SubmitMap: React.FC<MapProps> = ({ locations }) => {
  const { locationData } = locations;
  const [activeLocation, setActiveLocation] = useState<Location | any>(null);

  const activeLocationRef = useRef<Location | null>(null);

  const handleMarkerClick = (location: Location) => {
    setActiveLocation(location);
    activeLocationRef.current = location;
  };

  // useEffect(() => {
  //   if (activeLocation) {
  //   }
  // }, [activeLocation]);

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
        <SubmitMapUpdater
          newCenter={
            averagePosition.length > 0 ? averagePosition : defaultPosition
          }
        />
        <TileLayer
          url={mapboxTileUrl}
          attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
          bounds={japanLatLngBounds}
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
