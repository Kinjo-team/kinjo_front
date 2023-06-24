import React, {useState} from 'react'
import DeleteConfirmation from './DeleteConfirmation'

import './DKinjoCard.scss'

type DKinjoCardProps = {
    kinjo: any
}

const DKinjoCard = ({kinjo} : DKinjoCardProps) => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)

  // FUNCTIONS
  const handleDeleteKinjo = async () => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}itineraries/${kinjo.itinerary_id}`, {
      method: 'DELETE'
    })
    window.location.reload()
  }

  function toggleConfirmation(event: any) {
    event.stopPropagation()
    setShowConfirmation(!showConfirmation)
  }
  return (
    <>
      {showConfirmation && <DeleteConfirmation kinjoName={kinjo.itinerary_name} handleDeleteKinjo={handleDeleteKinjo} toggleConfirmation={toggleConfirmation} />}
      <div key={kinjo.itinerary_id} className='dkinjo-card--container'>
        <button onClick={toggleConfirmation}>X</button>
        <a className='dkinjo-card-title' href={`/kinjo/${kinjo.itinerary_id}`}><h1>{kinjo.itinerary_name}</h1></a>
        <div className='dkinjo-card-img'>
            <img src={kinjo.itinerary_image_url} alt={kinjo.itinerary_name} />
        </div>
      </div>
    </>
  )
}

export default DKinjoCard