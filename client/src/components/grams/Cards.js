import Card from './Card.js'
import { React, useState, useEffect } from 'react'
import { Box, Tabs, Tab, Paper } from '@material-ui/core';

import { Comment as Cmnt, Post, User } from '../../utils'




const Cards = () => {
  const [postState, setPostState] = useState([])
  const [followingPosts, setFollowingPosts] = useState([])
  const [view, viewState] = useState(true)
  const [currentUser, setCurrentUser] = useState({
    user: {}
  })
  const [comment, setComment] = useState({
    body: '',
    post_id: ''
  })
  const [update, setUpdate] = useState('')

  const handleCommentInput = ({ target }) => {
    setComment({ ...comment, body: target.value, post_id: target.id })
  }

  const handleView = () => {
    viewState(!view)
    console.log("view")
  }

  const handleComment = () => {
    Cmnt.create({
      comment: comment.body,
      post_id: comment.post_id
    })
      .then(({ data: cmnt }) => {
        setComment({ ...comment, body: '', post_id: '' })
        setUpdate('Need Update')
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    Post.getAll()
      .then(({ data: grams }) => {
        // directly mutilates data
        grams.length > 1 && grams.reverse()
        console.log(grams)
        setPostState(grams)
      })
      .catch(err => console.error(err))
    Post.getFollowing()
      .then(({ data: fgrams }) => {
        setFollowingPosts(fgrams)
        console.log(fgrams)
      })
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    User.profile()
      .then(({ data }) => {
        setCurrentUser({ user: data })
      })
      .catch(err => console.error(err))
  }, [])

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleView()
  };

  return (
    <>
      <Box xs={12} xl={12} lg={12} md={12} >

        <Paper style={{ marginBottom: '20px' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant='fullWidth'
          >
            <Tab label='All Posts'></Tab>
            <Tab label='Following'></Tab>
          </Tabs>
        </Paper>
      </Box>
      {view ? (
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
                created_on={post.created_On}
                likedByNumber={post.liked_by.length ? post.liked_by.length : 0}
                likedByUsers={post.liked_by}
                currentUser={currentUser}
                comment={comment}
                handleComment={handleComment}
                handleCommentInput={handleCommentInput}
                update={update}
                setUpdate={setUpdate}
              />
            ) : null
          }
        </Box>
      ) : (
        <Box xs={12} xl={12} lg={12} md={12} >
          { followingPosts.length
            ? followingPosts.map(gram =>
              <Card
                postId={gram._id}
                userId={gram.user._id}
                username={gram.user.username}
                profile={gram.user.profile}
                image={gram.image}
                caption={gram.body}
                created_on={gram.created_On}
                likedByNumber={gram.liked_by.length ? gram.liked_by.length : 0}
                likedByUsers={gram.liked_by}
                currentUser={currentUser}
                comment={comment}
                handleComment={handleComment}
                handleCommentInput={handleCommentInput}
                update={update}
                setUpdate={setUpdate}
              />
            ) : null
          }
        </Box>
      )}

    </>
  )
}

export default Cards
