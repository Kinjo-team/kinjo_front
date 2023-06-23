import React from 'react'
import { useAuth } from '../../../contexts/AuthContext'

import './DKinjoBookmarkedCard.scss'

type DKinjoBookmarkedCardProps = {
  kinjo: any
  toggleDeleteBookmark: () => void
}

const DKinjoBookmarkedCard = ({kinjo, toggleDeleteBookmark} : DKinjoBookmarkedCardProps) => {
  const {currentUser} = useAuth()


  async function handleDeleteBookmark(event: any) {
    event.stopPropagation();
    try {
      const resp = await fetch(`http://localhost:8000/bookmarks/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firebase_uuid: currentUser?.uid,
          itinerary_id: kinjo.itinerary_id
        })
      })

      if (resp.ok) {
        toggleDeleteBookmark()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='dkinjobookmarked-card--container' onClick={(event) => event.stopPropagation()}>
      <span className='favourite-icon' onClick={handleDeleteBookmark}>⭐</span>
      <a href={`/itinerary/${kinjo.itinerary.itinerary_id}`}>
        <h1 className='dkinjobookmarked-card-title'>{kinjo.itinerary.itinerary_name}</h1>
      </a>
      <div className='dkinjobookmarked-card-img'>
        <img src={kinjo.itinerary.itinerary_image_url} alt={kinjo.itinerary.itinerary_name} />
      </div>
    </div>
  )
}

export default DKinjoBookmarkedCard