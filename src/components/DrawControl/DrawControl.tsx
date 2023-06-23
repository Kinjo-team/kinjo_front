import React from "react";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

interface DrawControlProps {
  handleCircleCreated: (
    latitude: number,
    longitude: number,
    radius: number,
    layer: any,
    featureGroupRef: any
  ) => void;
  circleCreated: boolean;
  onShapeCreated: (shape: L.Layer) => void;
  onShapeDeleted: (shapes: L.Layer[]) => void;
}

const DrawControl: React.FC<DrawControlProps> = ({
  handleCircleCreated,
  circleCreated,
  onShapeCreated,
  onShapeDeleted,
}) => {
  const featureGroupRef = React.useRef<L.FeatureGroup>(null);

  const onCreated = (e: any) => {
    const layer = e.layer;
    const { lat, lng } = layer.getLatLng();
    let radius = layer.getRadius();
    handleCircleCreated(lat, lng, radius, layer, featureGroupRef.current);
    onShapeCreated(layer);
  };

  const onDeleted = (e: any) => {
    const layers = e.layers;
    const deletedLayers: L.Layer[] = [];
    layers.eachLayer((layer: any) => {
      deletedLayers.push(layer);
    });
    console.log("DELETED LAYERS", deletedLayers);
    onShapeDeleted(deletedLayers);
  };

  return (
    <FeatureGroup ref={featureGroupRef}>
      <EditControl
        position="topright"
        onCreated={onCreated}
        onDeleted={onDeleted}
        draw={{
          polyline: false,
          polygon: false,
          circle: circleCreated ? false : {},
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
