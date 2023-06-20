import React, {useState} from "react";

type LocationPopUpProps = {
  location: any;
  onClose: () => void;
};

const SubmitLocationPopUp = ({ location, onClose }: LocationPopUpProps) => {

  return (
    <div className="location--popup">
      <div className="card">
        <button className="close" onClick={onClose}>
          X
        </button>
        <h2>{location.loc_name}</h2>
        <p>{location.loc_descr_en}</p>
        <p>Tags: {location.loc_tags}</p>
        <p>{location.loc_coords}</p>
      </div>
    </div>
  );
};

export default SubmitLocationPopUp;
