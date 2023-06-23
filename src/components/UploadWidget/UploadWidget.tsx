import { useEffect, useRef } from "react";

import "./UploadWidget.scss";

declare global {
  interface Window {
    cloudinary: any;
  }
}

interface UploadWidgetProps {
  handleImageUrl: (imageURL: string) => void;
}

const UploadWidget: React.FC<UploadWidgetProps> = ({ handleImageUrl }) => {
  const cloudinaryRef = useRef<any>();
  const widgetRef = useRef<any>();
  
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    console.log("widget:", cloudinaryRef.current);
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dy6bhh9th",
        uploadPreset: "qpjgdtk3",
      },
      function (error: Error, result: any) {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          handleImageUrl(result.info.secure_url);
        }
      }
    );
  }, [handleImageUrl]);

  return (
    <button type="button" className="add-img-btn" onClick={() => widgetRef.current.open()}>
      Add Image
    </button>
  )
};

export default UploadWidget;
