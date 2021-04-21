import Card from './Card.js'
import { React, useState, useEffect } from 'react'
import { Box } from '@material-ui/core';

import { Comment as Cmnt, Post, User } from '../../utils'




const Cards = () => {
  const [postState, setPostState] = useState([])
  const [currentUser, setCurrentUser] = useState({
    user: {}
  })
  const [comment, setComment] = useState({
    body: '',
    post_id: ''
  })
  const [update, setUpdate] = useState({
    likes: '',
    comments: ''
  })

  const handleCommentInput = ({ target }) => {
    setComment({ ...comment, body: target.value, post_id: target.id })
  }


  const handleComment = () => {
    Cmnt.create({
      comment: comment.body,
      post_id: comment.post_id
    })
      .then(({ data: cmnt }) => {
        setComment({ ...comment, body: '', post_id: '' })
        setUpdate({ ...update, comments: 'Need Update' })
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    Post.getAll()
      .then(({ data: grams }) => {
        setPostState(grams)
        setUpdate({ ...update, likes: 'Up-to-Date' })
      })
      .catch(err => {
        console.error(err)
      })
  }, [update.likes])

  useEffect(() => {
    User.profile()
      .then(({ data }) => {
        setCurrentUser({ user: data })
        setUpdate({ ...update, likes: 'Up-to-Date' })
      })
      .catch(err => console.error(err))
  }, [update.likes])



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
            update={update}
            setUpdate={setUpdate}
            comment={comment}
            handleComment={handleComment}
            handleCommentInput={handleCommentInput}
          />
        ) : null
      }
    </Box>
  )
}

export default Cards
