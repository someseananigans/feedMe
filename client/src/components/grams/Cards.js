import Card from './Card.js'
import { React, useState, useEffect } from 'react'
import { Box } from '@material-ui/core';

import { Post, User } from '../../utils'




const Cards = () => {
  const [postState, setPostState] = useState({
    posts: []
  })
  const [update, setUpdate] = useState('Comments are Up-to-Date')
  const [currentUser, setCurrentUser] = useState({
    user: {}
  })

  useEffect(() => {
    Post.getAll()
      .then(({ data: grams }) => {
        setPostState(grams)
      })
      .catch(err => {
        console.error(err)
      })
  }, [update])

  useEffect(() => {
    User.profile()
      .then(({ data }) => {
        setCurrentUser({ user: data })
        setUpdate('Up-to-Date')
      })
      .catch(err => console.error(err))
  }, [update])



  return (
    <Box xs={12} xl={12} lg={12} md={12} >
      { postState.length
        ? postState.map(post =>
          <Card
            postId={post._id}
            userId={post.user._id}
            username={post.user.username}
            profile={post.user.profile}
            image={post.image}
            caption={post.body}
            likedByNumber={post.liked_by.length ? post.liked_by.length : 0}
            likedByUsers={post.liked_by}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            update={update}
            setUpdate={setUpdate}
          />
        ) : null
      }
    </Box>
  )
}

export default Cards
