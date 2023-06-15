import React from 'react'
import './DKinjoCard.scss'

type DKinjoCardProps = {
    kinjo: any
}

const DKinjoCard = ({kinjo} : DKinjoCardProps) => {
  return (
    <div className='dkinjo-card--container'>
        <h1 className='dkinjo-card-title'>{kinjo.itinerary_name}</h1>
    </div>
  )
}

export default DKinjoCard