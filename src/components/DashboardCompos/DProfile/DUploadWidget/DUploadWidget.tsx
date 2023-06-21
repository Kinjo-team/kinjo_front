import { useEffect, useRef } from "react";
import { useAuth } from "../../../../contexts/AuthContext";

import "./DUploadWidget.scss";

declare global {
  interface Window {
    cloudinary: any;
  }
}

interface DUploadWidgetProps {
  text: string;
}

const DUploadWidget = ({ text } : DUploadWidgetProps) => {
  const cloudinaryRef = useRef<any>();
  const widgetRef = useRef<any>();
  const {currentUser} = useAuth()

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    // console.log("widget:", cloudinaryRef.current);
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dy6bhh9th",
        uploadPreset: "qpjgdtk3",
      },
      function (error: any, result: any) {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
            postNewUserImage(result.info.secure_url)
        }
      }
    );
  }, []);

  async function postNewUserImage(newImg : string) {
    console.log("newImg", newImg, currentUser?.uid)
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}users/image`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firebase_uuid: currentUser?.uid,
            newImg: newImg
          }),
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button
      type="button"
      className="add-profile-btn"
      onClick={() => widgetRef.current.open()}
    >
      {text}
    </button>
  );
};

export default DUploadWidget;
