import React, {useEffect, useState} from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import DKinjoCard from '../DKinjoCard/DKinjoCard'
import CreateItinerary from '../../CreateItinerary/CreateItinerary'

import "./DKinjoViewer.scss"

const DKinjoViewer = () => {
    const [userKinjos, setUserKinjos] = useState<any>([])
    const [showCreateItinerary, setShowCreateItinerary] = useState<boolean>(false)
    const {currentUser} = useAuth()

    useEffect(() => {
        fetchUserKinjos();
    }, []);


    async function fetchUserKinjos() {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}itineraries/user/${currentUser?.uid}`)
            const data = await res.json()
            setUserKinjos(data)
        } catch (error) {
            console.error(error)
        }
    }

    function toggleCreateItinerary() {
        setShowCreateItinerary(!showCreateItinerary)
    }

  return (
    <> 
        {showCreateItinerary && <CreateItinerary toggleCreateItinerary={toggleCreateItinerary} />}
        <div className="dkinjoviewer--container">
            <div className="dkinjo--header">
                <h1>My KINJOs</h1>
                <button className="dkinjo-create-btn" onClick={toggleCreateItinerary} type="button">+</button>
            </div>
            <div className="dkinjo-cards--container">
                {userKinjos.map((kinjo: any) => (
                        <DKinjoCard kinjo={kinjo} />
                ))}
            </div>
        </div>
    </>
  )
}

export default DKinjoViewer