import Card from './Card.js'
import { React, useState, useEffect } from 'react'
import { Box } from '@material-ui/core';

import { Post } from '../../utils'




const Cards = () => {
  const [postState, setPostState] = useState({
    posts: []
  })

  useEffect(() => {
    Post.getAll()
      .then(({ data: grams }) => {
        setPostState(grams)
        console.log(grams)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])



  return (
    <Box xs={12} xl={12} lg={12} md={12} >
      { postState.length
        ? postState.map(post =>
          <Card
            profile={post.user.profile}
            username={post.user.username}
            image={post.image}
            caption={post.body}
            likedByNumber={post.liked_by.length ? post.liked_by.length : 0}
            postId={post._id}
          />
        ) : null
      }
    </Box>
  )
}

export default Cards
