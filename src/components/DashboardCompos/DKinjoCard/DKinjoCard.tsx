import React from 'react'
import './DKinjoCard.scss'

type DKinjoCardProps = {
    kinjo: any
}

const DKinjoCard = ({kinjo} : DKinjoCardProps) => {
  return (
    <div className='dkinjo-card--container'>
        <h1 className='dkinjo-card-title'>{kinjo.itinerary_name}</h1>
        <div className='dkinjo-card-img'>
            <img src={kinjo.itinerary_image_url} alt={kinjo.itinerary_name} />
        </div>
    </div>
  )
}

export default DKinjoCard