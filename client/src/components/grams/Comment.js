import React from 'react'


const Comment = (props) => {

  const { accountName, comment } = props
  return (
    <>
      <div>
        <strong>{accountName.username}</strong> <span>{comment}</span>
      </div>
    </>
  )
}

export default Comment
