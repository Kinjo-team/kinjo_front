import { useMap } from "react-leaflet";

interface CustomFlyToOptions {
  duration?: number;
  easeLinearity?: number;
  noMoveStart?: boolean;
  onEnd?: () => void;
}

interface FlyToProps {
  position: any;
  zoom: any;
  onEnd?: () => void;
}

const FlyTo: React.FC<FlyToProps> = ({ position, zoom, onEnd }) => {
  const map = useMap();
  if (position) {
    const options: CustomFlyToOptions = {
      duration: 1,
      onEnd: onEnd,
    };
    map.flyTo(position, zoom, options);
  }
  return null;
};

export default FlyTo;
