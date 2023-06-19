import React from "react";
import { useMap } from "react-leaflet";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

interface DrawControlProps {
  // forwardTransition: Function;
  handleCircleCreated: (latitude: number, longitude: number) => void;
  onShapeCreated: (shape: L.Layer) => void;
  onShapeDeleted: (shapes: L.Layer[]) => void;
}

const DrawControl: React.FC<DrawControlProps> = ({
  // forwardTransition,
  handleCircleCreated,
  onShapeCreated,
  onShapeDeleted,
}) => {
  const map = useMap();

  const onCreated = (e: any) => {
    const layer = e.layer;
    const { lat, lng } = layer.getLatLng();
    handleCircleCreated(lat, lng);
    onShapeCreated(layer);
    // forwardTransition();
  };

  const onDeleted = (e: any) => {
    const layers = e.layers;
    const deletedLayers: L.Layer[] = [];
    layers.eachLayer((layer: any) => {
      deletedLayers.push(layer);
    });
    onShapeDeleted(deletedLayers);
  };

  return (
    <FeatureGroup>
      <EditControl
        position="topright"
        onCreated={onCreated}
        onDeleted={onDeleted}
        draw={{
          polyline: false,
          polygon: false,
          circle: {},
          marker: false,
          circlemarker: false,
          rectangle: false,
        }}
        edit={{
          edit: true,
          remove: true,
        }}
      />
    </FeatureGroup>
  );
};

export default DrawControl;
