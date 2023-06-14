import React from "react";

type LocationCardProps = {
  location: any;
  handleClick: () => void;
};

const SubmitLocationCard = ({ location, handleClick }: LocationCardProps) => {
  return (
    <div onClick={handleClick} className="card--container">
      <h3>{location.loc_name}</h3>
      <p>{location.loc_descr_en}</p>
      <p>Tags: {location.loc_tags}</p>
      <p>{location.loc_coords}</p>
    </div>
  );
};

export default SubmitLocationCard;