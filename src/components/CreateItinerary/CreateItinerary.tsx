import React, { useState } from "react";
import SetYourKinjo from "./SetYourKinjo/SetYourKinjo";
import ThankYouSubmit from "./ThankYouSubmit/ThankYouSubmit";
// CONTEXTS
import { KinjoProvider } from "../../contexts/KinjoContext";

import "./CreateItinerary.scss";

type CreateItineraryProps = {
  toggleCreateItinerary: () => void;
};


const CreateItinerary = ({ toggleCreateItinerary }: CreateItineraryProps) => {
  const [newKinjoId, setNewKinjoId] = useState<any>("");

  // LOGIC FOR CHANGING POPUPS
  const [pageTransition, setPageTransition] = useState<number>(1);

  // FUNCTIONS
  function forwardTransitionPage() {
    setPageTransition((prevPageTransition) => prevPageTransition + 1);
  }

  function insertNewKinjoId(newKinjoId: any) {
    setNewKinjoId(newKinjoId);
  }

  return (
    <>
      <main className="overlay--container">
        <KinjoProvider value>
          {pageTransition === 1 && (
            <SetYourKinjo
              forwardTransitionPage={forwardTransitionPage}
              toggleCreateItinerary={toggleCreateItinerary}
              insertNewKinjoId={insertNewKinjoId}
            />
          )}
          {pageTransition === 2 && (
            <ThankYouSubmit newKinjoId={newKinjoId} toggleCreateItinerary={toggleCreateItinerary} />
          )}
        </KinjoProvider>
      </main>
    </>
  );
};

export default CreateItinerary;
