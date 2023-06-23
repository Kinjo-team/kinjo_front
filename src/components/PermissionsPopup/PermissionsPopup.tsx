import React from "react";

interface PermissionsPopupProps {
  onAccept: () => void;
  onReject: () => void;
}

const PermissionsPopup: React.FC<PermissionsPopupProps> = ({
  onAccept,
  onReject,
}) => {
  return (
    <div className="permissions-popup">
      <p>
        In order to have the best Kinjo experience, we recommend updating your
        browser settings to enable location access & acceptance of 3rd party
        cookies while using this site!
      </p>
      <button onClick={onAccept}>Got it</button>
      <button onClick={onReject}>No thanks</button>
    </div>
  );
};

export default PermissionsPopup;
