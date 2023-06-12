import "./LocationPopUp.scss"

type LocationPopUpProps = {
    location: any;
    onClose: () => void;
}

const LocationPopUp = ({ location, onClose } : LocationPopUpProps) => {
  return (
    <div className="location--popup">
        <div className="card">
            <button className="close" onClick={onClose}>X</button>
            <h2>{location.location.loc_name}</h2>
            <p>{location.location.loc_descr_en}</p>
            <p>Tags: {location.location.loc_tags}</p>
            <p>{location.location.loc_coords}</p>
        </div>
    </div>
  );
};

export default LocationPopUp;
