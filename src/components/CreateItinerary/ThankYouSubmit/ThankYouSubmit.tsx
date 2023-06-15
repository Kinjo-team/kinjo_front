import React from 'react'

type ThankYouSubmitProps = {
    toggleCreateItinerary: () => void
}

const ThankYouSubmit = ({toggleCreateItinerary} : ThankYouSubmitProps) => {
  return (
    <div className='setkinjo--container'>
        <h1>Your Kinjo has been created!</h1>
        <p>You did it! Thank you for creating your Kinjo!</p>
        <p>*POSSIBLE SHARE LINK HERE?*</p>
        <button disabled={false} onClick={toggleCreateItinerary}>Close</button>
    </div>
  )
}

export default ThankYouSubmit