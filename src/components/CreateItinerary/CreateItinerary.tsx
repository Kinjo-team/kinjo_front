import React, { useState } from "react";
import SetYourKinjo from "./SetYourKinjo/SetYourKinjo";
import ChooseLocations from "./ChooseLocations/ChooseLocations";
import SubmitKinjo from "./SubmitKinjo/SubmitKinjo";
import ThankYouSubmit from "./ThankYouSubmit/ThankYouSubmit";
// CONTEXTS
import { KinjoProvider } from "../../contexts/KinjoContext";

import "./CreateItinerary.scss";

type CreateItineraryProps = {
  toggleCreateItinerary: () => void;
};

// interface LocationData {
//   loc_coords: [number, number];
//   loc_name: string;
//   loc_descr_en: string;
//   loc_tags: string[];
// }

// interface CreateItineraryData {
//   firebase_uuid: string;
//   itinerary_name: string;
//   itinerary_descr: string;
//   itinerary_tags: string[];
//   enteredTag: string;
//   locationData: LocationData[];
// }

const CreateItinerary = ({ toggleCreateItinerary }: CreateItineraryProps) => {
  const [locationCards, setLocationCards] = useState<
    {
      loc_coords: [number, number];
      loc_name: string;
      loc_descr_en: string;
      loc_tags: string[];
    }[]
  >([]);

  // LOGIC FOR CHANGING POPUPS
  const [pageTransition, setPageTransition] = useState<number>(1);


  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   try {
  //     const response = await fetch("http://localhost:8000/itineraries", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log("Successfully created itinerary:", data);
  //       // Reset the form data
  //       setFormData({
  //         firebase_uuid: "",
  //         itinerary_name: "",
  //         itinerary_descr: "",
  //         itinerary_tags: [],
  //         enteredTag: "",
  //         locationData: [],
  //       });
  //       // Clear the location cards
  //       setLocationCards([]);
  //     } else {
  //       throw new Error("Failed to create itinerary");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleLocationData = (locationData: LocationData) => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     locationData: [...prevFormData.locationData, locationData],
  //   }));
  //   setLocationCards((prevLocationCards) => [
  //     ...prevLocationCards,
  //     locationData,
  //   ]);
  // };


  // FUNCTIONS
  // This function is the form from closing when user clicks on elements
  function stopBubblingUp(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    event.stopPropagation();
  }
  function forwardTransition() {
    setPageTransition((prevPageTransition) => prevPageTransition + 1);
  }
  function backwardTransition() {
    setPageTransition((prevPageTransition) => prevPageTransition - 1);
  }

  return (
    <>
      <main className="overlay--container">
        <KinjoProvider value>
          {pageTransition === 1 && <SetYourKinjo forwardTransition={forwardTransition} toggleCreateItinerary={toggleCreateItinerary} />}
          {pageTransition === 2 && <ChooseLocations forwardTransition={forwardTransition} backwardTransition={backwardTransition} toggleCreateItinerary={toggleCreateItinerary} />}
          {pageTransition === 3 && <SubmitKinjo forwardTransition={forwardTransition} backwardTransition={backwardTransition} toggleCreateItinerary={toggleCreateItinerary} />}
          {pageTransition === 4 && <ThankYouSubmit toggleCreateItinerary={toggleCreateItinerary} />}
        </KinjoProvider>
      </main>
    </>
  )
};

export default CreateItinerary;

