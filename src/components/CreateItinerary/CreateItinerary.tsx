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

  // LOGIC FOR CHANGING POPUPS
  const [pageTransition, setPageTransition] = useState<number>(1);

  // FUNCTIONS
  function forwardTransitionPage() {
    setPageTransition((prevPageTransition) => prevPageTransition + 1);
  }

  return (
    <>
      <main className="overlay--container">
        <KinjoProvider value>
          {pageTransition === 1 && (
            <SetYourKinjo
              forwardTransitionPage={forwardTransitionPage}
              toggleCreateItinerary={toggleCreateItinerary}
            />
          )}
          {pageTransition === 2 && (
            <ThankYouSubmit toggleCreateItinerary={toggleCreateItinerary} />
          )}
        </KinjoProvider>
      </main>
    </>
  );
};

export default CreateItinerary;
