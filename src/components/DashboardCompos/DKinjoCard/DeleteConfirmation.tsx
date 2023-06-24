import React from 'react'

type DeleteConfirmationProps = {
    handleDeleteKinjo: () => void
    kinjoName: string
    toggleConfirmation: (event: any) => void
}

const DeleteConfirmation = ({kinjoName, handleDeleteKinjo, toggleConfirmation} : DeleteConfirmationProps) => {
  return (
    <div className='delete-confirm--overlay'>
        <div className='delete-confirm--container'>
            <button className='close-btn' onClick={toggleConfirmation}>X</button>
            <p>Are you sure you want to delete <b>{kinjoName}</b>? <br />
                <i>(This action cannot be undone)</i>
            </p>
            <div className='btn-grp'>
                <button className='confirm' onClick={handleDeleteKinjo}>Confirm</button>
                <button className='cancel' onClick={toggleConfirmation}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteConfirmation