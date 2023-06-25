import React, { useEffect, useState } from 'react';

import "./MobileOnlyPopUps.scss"

const CreateKinjoMsg = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasShownPopup = sessionStorage.getItem('hasShownPopup');

    // Check if the popup has already been shown in the current session
    if (!hasShownPopup && window.innerWidth <= 868) {
      // Show the popup
      setShowPopup(true);

      // Set the 'hasShownPopup' flag in sessionStorage
      sessionStorage.setItem('hasShownPopup', 'true');

      // Hide the popup after 2 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  }, []);

  return (
    <div>
      {showPopup && (
        <div className="mobilepopup--container">
          <p>To create a your own KINJO, <br /> please check out the desktop version!</p>
        </div>
      )}
    </div>
  );
};

export default CreateKinjoMsg;
