import React from "react";
import "./LocationCard.scss";
const googleIcon = require("../../assets/icons/googleIcon.png");

type LocationCardProps = {
  location: any;
  handleClick: () => void;
};

const LocationCard = ({ location, handleClick }: LocationCardProps) => {
  const latitude = location.location.loc_coords[0];
  const longitude = location.location.loc_coords[1];
  
  return (
    <>
      <div onClick={handleClick} className="card--container">
        <img className="card--image" src={location.location.loc_image_url} alt={location.location.loc_name} />
        <div className="card-info-container">
          <div className="location-info">
            <h3>{location.location.loc_name}</h3>
            <p>{location.location.loc_descr_en}</p>
          </div>
            <p className="tags-container">Tags: {location.location.loc_tags && location.location.loc_tags.map((tags : string) => {
              return (<div className="tag">{tags}</div>)})}</p>
        </div>
        <a className="link-google" href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`} target="_blank" rel="noopener noreferrer"><img className="icon-google" src={googleIcon} alt="google maps" /> Open in Google Maps</a>
      </div>
    </>
  );
};

export default LocationCard;
