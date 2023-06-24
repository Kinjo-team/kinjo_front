import React from 'react'
import {Link} from 'react-router-dom'

type FollowerPopUpProps = {
    toggleFollowerPopUp: () => void,
    followers: string[]
}

const FollowerPopUp = ({followers, toggleFollowerPopUp} : FollowerPopUpProps) => {
  return (
    <div className='popup--overlay'>
      <div className='popup--container'>
      <button
            className="close-btn"
            onClick={toggleFollowerPopUp}
        >
          X
        </button>
        <h2>Followers</h2>
        <div className='follow-card-container'>
          {followers.map((follower: any) => (
              <Link to={`/profile/${follower.username}`} key={follower.username}>
                  <div className='card'>
                    <img src={follower.user_img} alt={follower.username} />
                    <span>{follower.username}</span>
                  </div>
              </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FollowerPopUp