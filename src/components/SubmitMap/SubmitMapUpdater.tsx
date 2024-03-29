import { useMap } from "react-leaflet";
import { useEffect } from "react";

interface MapUpdaterProps {
  newCenter: [number, number];
}

const SubmitMapUpdater: React.FC<MapUpdaterProps> = ({ newCenter }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(newCenter, 13);
  }, [map, newCenter]);

  return null;
};

export default SubmitMapUpdater;
