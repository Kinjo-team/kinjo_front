import React from "react";
import "./PermissionsPopup.scss";

interface PermissionsPopupProps {
  onAccept: () => void;
  onReject: () => void;
}

const PermissionsPopup: React.FC<PermissionsPopupProps> = ({
  onAccept,
  onReject,
}) => {
  return (
    <div className="permissions-popup--overlay">
      <div className="permissions-popup">
        <p>
          In order to have the best Kinjo experience, we recommend updating your
          browser settings to enable location access & acceptance of 3rd party
          cookies while using this site!
        </p>
        <button className="accept-btn" onClick={onAccept}>Got it!</button>
        <button className="decline-btn" onClick={onReject}>No thanks</button>
      </div>
    </div>
  );
};

export default PermissionsPopup;
