import React, {useEffect, useState} from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import {Link } from 'react-router-dom'
import DKinjoBookmarkedCard from '../DKinjoBookmarkedCard/DKinjoBookmarkedCard'

import "./DKinjoBookmarked.scss"

const DKinjoBookmarked = () => {
    const [bookmarkedKinjos, setBookmarkedKinjos] = useState([])
    const [bookmarkedKinjosLoaded, setBookmarkedKinjosLoaded] = useState(false)
    const [deleteBookmark, setDeleteBookmark] = useState(false)
    const {currentUser} = useAuth()

    useEffect(() => {
        fetchBookmarkedKinjos()
    }, [])

    useEffect(() => {
        fetchBookmarkedKinjos()
        return () => {
            setBookmarkedKinjos([])
        }
    }, [deleteBookmark])

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

    function toggleDeleteBookmark() {
        setDeleteBookmark(!deleteBookmark)
    }

    
  return (
    <div className='dkinjobookmarked--container'>
        <div className='dkinjobookmarked--header'>
            <h1>Favourites</h1>
        </div>
        <div className='dkinjobookmarked-cards--container'>
            {bookmarkedKinjosLoaded && bookmarkedKinjos.map((kinjo: any) => {
                return (
                    <DKinjoBookmarkedCard key={kinjo.id} kinjo={kinjo} toggleDeleteBookmark={toggleDeleteBookmark}   />
                )
            })}
        </div>
    </div>
  )
}

export default DKinjoBookmarked