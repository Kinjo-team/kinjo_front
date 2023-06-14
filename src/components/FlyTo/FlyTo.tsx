import { useMap } from "react-leaflet";

interface FlyToProps {
  position: [number, number];
  zoom: number;
}

const FlyTo: React.FC<FlyToProps> = ({ position, zoom }) => {
  const map = useMap();
  if (position) {
    map.flyTo(position, zoom);
  }
  return null;
};

export default FlyTo;
