import React from "react";
import "./LocationPopUp.scss";

const googleIcon = require("../../assets/icons/googleIcon.png");

type LocationPopUpProps = {
  location: any;
  onClose: () => void;
};

const LocationPopUp = ({ location, onClose }: LocationPopUpProps) => {
  const latitude = location.location.loc_coords[0];
  const longitude = location.location.loc_coords[1];

  return (
    <div className="location--popup">
      <div className="card">
        <button className="close" onClick={onClose}>
          X
        </button>
        <a className="link-google" href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`} target="_blank" rel="noopener noreferrer"><img className="icon-google" src={googleIcon} alt="google maps" /> Open in Google Maps</a>
        <div className="card-info">
          <div className="info">
            <h2>{location.location.loc_name}</h2>
            <p>{location.location.loc_descr_en}</p>
          </div>
          <p className="tags-container">Tags: {location.location.loc_tags.map((tags : string) => {
            return (<div className="tag">{tags}</div>)
          })}</p>
        </div>
        <img className="card-img" src={location.location.loc_image_url} alt={location.location.loc_name} />
      </div>
    </div>
  );
};

export default LocationPopUp;
