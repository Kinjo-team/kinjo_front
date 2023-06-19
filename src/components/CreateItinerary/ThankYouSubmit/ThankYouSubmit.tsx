import React from 'react'
import './ThankYouSubmit.scss'

type ThankYouSubmitProps = {
    toggleCreateItinerary: () => void
    
}

const ThankYouSubmit = ({toggleCreateItinerary} : ThankYouSubmitProps) => {
  return (
    <div className='create-kinjo--container'>
        <button className='create-kinjo-close-btn' onClick={toggleCreateItinerary}><span className="material-symbols-outlined">cancel</span></button>
        <div className='thankyou--container'>
            <h1>Your Kinjo has been created!</h1>
            <p>You did it! Thank you for creating your Kinjo!</p>
            <p>*POSSIBLE SHARE LINK HERE?*</p>
            <button className='thankyou-close-btn' disabled={false} onClick={toggleCreateItinerary}>Close</button>
        </div>
    </div>
  )
}

export default ThankYouSubmit