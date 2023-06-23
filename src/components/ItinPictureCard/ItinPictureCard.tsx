import "./ItinPictureCard.scss"

type ItinPictureCardProps = {
    itinerary: any;
    index: number;
}

const ItinPictureCard = ({itinerary, index} : ItinPictureCardProps) => {


  return (
    <div className="itinpicturecard--container">
        <h3>{itinerary.itinerary_name}</h3>
        <div className="itinpicture--img">
          <img src={itinerary.itinerary_image_url} alt={itinerary.itinerary_name} />
        </div>
    </div>
  )
}

export default ItinPictureCard