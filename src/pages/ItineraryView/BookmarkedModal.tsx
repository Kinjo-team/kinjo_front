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
        <p>{text}</p>
    </div>
  )
}

export default BookmarkedModal