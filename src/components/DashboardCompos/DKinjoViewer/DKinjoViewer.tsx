import React, {useEffect, useState} from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import {Link} from 'react-router-dom'
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
            const res = await fetch(`http://localhost:8000/itineraries/user/${currentUser?.uid}`)
            const data = await res.json()
            console.log(data)
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
                <h1>My Kinjos</h1>
                <button className="dkinjo-create-btn" onClick={toggleCreateItinerary} type="button">Create New Kinjo</button>
            </div>
            <div className="dkinjo-cards--container">
                {userKinjos.map((kinjo: any) => (
                    <Link to={`/itinerary/${kinjo.itinerary_id}`} key={kinjo.itinerary_id}>
                        <DKinjoCard kinjo={kinjo} />
                    </Link>
                ))}
            </div>
        </div>
    </>
  )
}

export default DKinjoViewer