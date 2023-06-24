import { useEffect, useRef } from "react";

import "./UploadWidget.scss";

declare global {
  interface Window {
    cloudinary: any;
  }
}

interface UploadWidgetProps {
  insertNewImgUrl: (url: string) => void;
  handleImageUrl: (imageURL: string) => void;
  text: string;
}

const UploadWidget: React.FC<UploadWidgetProps> = ({ handleImageUrl, text, insertNewImgUrl }) => {
  const cloudinaryRef = useRef<any>();
  const widgetRef = useRef<any>();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dy6bhh9th",
        uploadPreset: "qpjgdtk3",
      },
      function (error: any, result: any) {
        if (!error && result && result.event === "success") {
          insertNewImgUrl(result.info.secure_url);
          handleImageUrl(result.info.secure_url);
        }
      }
    );
  }, [handleImageUrl]);

  return (
    <button
      type="button"
      className="add-img-btn"
      onClick={() => widgetRef.current.open()}
    >
      {text}
    </button>
  );
};

export default UploadWidget;
