import React, {useEffect, useState} from 'react'
import Confetti from 'react-confetti'

import './ThankYouSubmit.scss'

type ThankYouSubmitProps = {
    toggleCreateItinerary: () => void
    newKinjoId: any
}

const ThankYouSubmit = ({toggleCreateItinerary, newKinjoId} : ThankYouSubmitProps) => {
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const containerElement = document.querySelector('.thankyousubmit--container');
    if (containerElement) {
      const { width, height } = containerElement.getBoundingClientRect();
      setContainerDimensions({ width, height });
    }
  }, []);

  return (
    <div className='thankyousubmit--container'>
        <button className='create-kinjo-close-btn' onClick={toggleCreateItinerary}>X</button>
        <div onClick={(event) => event.stopPropagation()} className='thankyou--container'>
            <h1>Your KINJO has been created!</h1>
            <p>You did it! Thank you for creating your KINJO.</p>
            <a href={`/kinjo/${newKinjoId}`}>Click Here to view it!</a>
            <button className='thankyou-close-btn' disabled={false} onClick={toggleCreateItinerary}>Close</button>
        </div>
        <Confetti width={containerDimensions.width} height={containerDimensions.height} />
    </div>
  )
}

export default ThankYouSubmit