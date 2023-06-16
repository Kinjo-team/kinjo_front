import React, {useEffect, useState} from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import DKinjoCard from '../DKinjoCard/DKinjoCard'

import "./DKinjoBookmarked.scss"

const DKinjoBookmarked = () => {
    const [bookmarkedKinjos, setBookmarkedKinjos] = useState([])
    const [bookmarkedKinjosLoaded, setBookmarkedKinjosLoaded] = useState(false)
    const {currentUser} = useAuth()

    useEffect(() => {
        fetchBookmarkedKinjos()
    }, [])

    async function fetchBookmarkedKinjos() {
        try {
            const res = await fetch(`http://localhost:8000/bookmarks/${currentUser?.uid}`)
            const data = await res.json()
            setBookmarkedKinjos(data)
            setBookmarkedKinjosLoaded(true)
        } catch (error) {
            console.error(error)
        }
    }

    
  return (
    <div className='dkinjobookmarked--container'>
        <h1>Favourites</h1>
        <div className='dkinjobookmarked--cards'>
            {bookmarkedKinjosLoaded && bookmarkedKinjos.map((kinjo: any) => {
                return <DKinjoCard key={kinjo.id} kinjo={kinjo} />
            })};
        </div>
    </div>
  )
}

export default DKinjoBookmarked