import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './OUKinjos.scss'

type OUKinjosProps = {
    username: string | undefined
}

const OUKinjos = ({username} : OUKinjosProps) => {
    const [kinjos, setKinjos] = useState<any[]>([])

    useEffect(() => {
        fetchKinjos()
    }, [])

    // FUNCTIONS
    async function fetchKinjos() {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}itineraries/${username}`)
            const data = await res.json()
            setKinjos(data)
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <div className='oukinjos--container'>
        <h1>{username}'s Kinjos</h1>
        <div className='oukinjos--cards-container'>
            {kinjos.map((kinjo: any) => (
                <Link to={`/kinjo/${kinjo.itinerary_id}`} key={kinjo.itinerary_id}>
                    <div className='oukinjos--card' key={kinjo.itinerary_id}>
                        <h3>{kinjo.itinerary_name}</h3>
                        <p>{kinjo.itinerary_description}</p>
                        <p>{kinjo.itinerary_location}</p>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default OUKinjos