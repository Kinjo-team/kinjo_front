import React, {useEffect} from 'react'

type BookmarkedModalProps = {
    text: string
    toggleBookmarkedModal: () => void
}

const BookmarkedModal = ({text, toggleBookmarkedModal} : BookmarkedModalProps) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            toggleBookmarkedModal()
        }, 2000)
        return () => {
            clearTimeout(timeout)
        }
    }, [toggleBookmarkedModal])


  return (
    <div className='bookmarkedpopup--container'>
        <p>You favourited <b>{text}</b>!</p> 
    </div>
  )
}

export default BookmarkedModal