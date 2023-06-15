import React, {useEffect} from 'react'
import { useKinjo } from '../../../contexts/KinjoContext'
import "./ChooseLocations.scss"

type ChooseLocationsoProps = {
    forwardTransition: () => void
    backwardTransition: () => void
}

const ChooseLocations = ({forwardTransition, backwardTransition} : ChooseLocationsoProps) => {

  return (
    <div className='setkinjo--container'>
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