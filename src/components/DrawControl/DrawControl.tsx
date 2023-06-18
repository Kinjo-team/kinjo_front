// import React, { useEffect } from "react";
// import { useMap } from "react-leaflet";
// import L from "leaflet";
// import "leaflet-draw";

// interface DrawControlProps {
//   onShapeCreated: (shape: L.Layer) => void;
// }

// const DrawControl: React.FC<DrawControlProps> = ({ onShapeCreated }) => {
//   const map = useMap();

//   useEffect(() => {
//     // Initialize the FeatureGroup for drawn items
//     const drawnItems = new L.FeatureGroup();
//     map.addLayer(drawnItems);

//     // Initialize the draw control and pass it the FeatureGroup of editable layers
//     const drawControl = new L.Control.Draw({
//       edit: {
//         featureGroup: drawnItems,
//         edit: true as any,
//         remove: true as any,
//       },
//       draw: {
//         polyline: false,
//         polygon: false,
//         circle: {},
//         marker: false,
//         circlemarker: false,
//         rectangle: false,
//       },
//     });
//     map.addControl(drawControl);

//     // Handle the draw:created event
//     map.on("draw:created", (e: any) => {
//       const layer = e.layer;
//       drawnItems.addLayer(layer);
//       onShapeCreated(layer); // Call the callback function with the drawn shape
//     });

//     map.on("draw:edited", (e: any) => {
//       const layer = e.layer;
//       layer.eachLayer((layer: any) => {
//         console.log("Edited layer:", layer);
//         // Update the shape in your application (e.g., save to the database)
//       });
//     });

//     map.on("draw:deleted", (e: any) => {
//       const layer = e.layer;
//       layer.eachLayer((layer: any) => {
//         console.log("Deleted layer:", layer);
//         // Remove the shape from your application (e.g., delete from the database)
//       });
//     });

//     return () => {
//       // Clean up on component unmount
//       map.removeControl(drawControl);
//       map.removeLayer(drawnItems);
//       map.off("draw:created");
//       map.off("draw:edited");
//       map.off("draw:deleted");
//     };
//   }, [map]);

//   return null;
// };

// export default DrawControl;

import React from "react";
import { useMap } from "react-leaflet";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

interface DrawControlProps {
  forwardTransition: Function;
  onShapeCreated: (shape: L.Layer) => void;
  onShapeDeleted: (shapes: L.Layer[]) => void;
}

const DrawControl: React.FC<DrawControlProps> = ({
  forwardTransition,
  onShapeCreated,
  onShapeDeleted,
}) => {
  const map = useMap();

  const onCreated = (e: any) => {
    const layer = e.layer;
    onShapeCreated(layer);
    forwardTransition();
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
