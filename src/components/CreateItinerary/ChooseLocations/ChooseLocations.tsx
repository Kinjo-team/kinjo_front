import React, {useEffect} from 'react'
import { useKinjo } from '../../../contexts/KinjoContext'
import "./ChooseLocations.scss"

type ChooseLocationsoProps = {
    forwardTransition: () => void
    backwardTransition: () => void
    toggleCreateItinerary: () => void
}

const ChooseLocations = ({forwardTransition, backwardTransition, toggleCreateItinerary} : ChooseLocationsoProps) => {

  return (
    <div className='create-kinjo--container'>
        <button className='create-kinjo-close-btn' onClick={toggleCreateItinerary}><span className="material-symbols-outlined">cancel</span></button>
        <h1>2. Populate your Kinjo!</h1>
        <p>Find the areas you want to show and add the information.</p>
        <div className='setkinjo-map-container'>
            PUT YOUR MAP HERE
        </div>
        <button onClick={backwardTransition}>Back</button>
        <button disabled={false} onClick={forwardTransition}>Next ⇒</button>
    </div>
  )
}

export default ChooseLocations