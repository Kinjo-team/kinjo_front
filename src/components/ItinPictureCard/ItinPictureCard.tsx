import "./ItinPictureCard.scss"

type ItinPictureCardProps = {
    itinerary: any;
}

const ItinPictureCard = ({itinerary} : ItinPictureCardProps) => {
  return (
    <div className="itinpicturecard--container">
        <h3>{itinerary.itinerary_name}</h3>
    </div>
  )
}

export default ItinPictureCard