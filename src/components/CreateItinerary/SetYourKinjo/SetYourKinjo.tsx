import React, {useEffect} from 'react'
import { useKinjo } from '../../../contexts/KinjoContext'
import "./SetYourKinjo.scss"

type SetYourKinjoProps = {
    forwardTransition: () => void
}

const SetYourKinjo = ({forwardTransition} : SetYourKinjoProps) => {
    const {kinjo, changeKinjo} = useKinjo();
    useEffect(() => {
        changeKinjo({
            name: "test",
            description: "test",
            tags: [],
            locationData: [],
            kinjoCoords: [0, 0]
        });
    }, []); 
    console.log(kinjo)

  return (
    <div className='setkinjo--container'>
        <h1>1. Set Your Kinjo</h1>
        <p>Click on the map, and drag to set the confines of your Kinjo!</p>
        <div className='setkinjo-map-container'>
            PUT YOUR MAP HERE
        </div>
        <button disabled={false} onClick={forwardTransition}>Next ⇒</button>
    </div>
  )
}

export default SetYourKinjo