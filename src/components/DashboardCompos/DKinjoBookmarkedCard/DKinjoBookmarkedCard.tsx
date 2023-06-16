import React from 'react'
import { useAuth } from '../../../contexts/AuthContext'

import './DKinjoBookmarkedCard.scss'

type DKinjoBookmarkedCardProps = {
  kinjo: any
}

const DKinjoBookmarkedCard = ({kinjo} : DKinjoBookmarkedCardProps) => {
  const {currentUser} = useAuth()


  function handleDeleteBookmark() {
    fetch(`http://localhost:8000/bookmarks/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firebase_uuid: currentUser?.uid,
        itinerary_id: kinjo.itinerary_id
      })
    })
  }

  return (
    <div className='dkinjo-card--container'>
      <span onClick={handleDeleteBookmark}>⭐</span>
      <h1 className='dkinjo-card-title'>{kinjo.itinerary_name}</h1>
    </div>
  )
}

export default DKinjoBookmarkedCard