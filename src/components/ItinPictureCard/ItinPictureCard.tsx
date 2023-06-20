import "./ItinPictureCard.scss"
const pic1 = require("../../assets/images/placeholders/placeholder1.png")
const pic2 = require("../../assets/images/placeholders/placeholder2.jpg")
const pic3 = require("../../assets/images/placeholders/placeholder3.jpg")

type ItinPictureCardProps = {
    itinerary: any;
    index: number;
}

const ItinPictureCard = ({itinerary, index} : ItinPictureCardProps) => {

    const pics = [pic1, pic2, pic3]
    if (index > 2) index = Math.floor(Math.random() * 3);

  return (
    <div className="itinpicturecard--container">
        <h3>{itinerary.itinerary_name}</h3>
        <img className="itinpicture--img" src={pics[index]} alt={itinerary.itinerary_name}/>
    </div>
  )
}

export default ItinPictureCard