import { useEffect } from "react";
import { useMap } from "react-leaflet";

const useMapInstance = (callback: (map: any) => void) => {
  const map = useMap();

  useEffect(() => {
    callback(map);
  }, [map, callback]);

  return null;
};
export default useMapInstance;
