import { React, useState, useEffect } from 'react'

// Components
import { Box, Tabs, Tab, Paper, LinearProgress } from '@material-ui/core';
import Card from './Card'

// Utils
import { Comment as Cmnt, Post, User } from '../../utils'


const Cards = () => {
  const [postState, setPostState] = useState([])
  const [followingPosts, setFollowingPosts] = useState([])
  const [value, setValue] = useState(0);
  const [view, setView] = useState(true)
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState({
    user: {}
  })
  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleView()
  };

  const handleView = () => {
    setView(!view)
  }

  const RenderRecent = ({ show }) => {
    return (
      <Box xs={12} xl={12} lg={12} md={12} style={{ display: show }}>
        { postState.length && postState.map(post =>
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
          />
        )
        }
      </Box>
    )
  }

  const RenderFollow = () => {
    return (
      <Box xs={12} xl={12} lg={12} md={12} >
        { followingPosts.length && followingPosts.map(gram =>
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
          />
        )
        }
      </Box>
    )
  }

  useEffect(() => {
    setLoading(true)
    Post.getAll()
      .then(({ data: grams }) => {
        // directly mutilates data
        grams.length > 1 && grams.reverse()
        setPostState(grams)
      })
      .catch(err => console.error(err))
    Post.getFollowing()
      .then(({ data: fgrams }) => {
        setFollowingPosts(fgrams)
      })
      .catch(err => console.error(err))
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  }, [])

  useEffect(() => {
    User.profile()
      .then(({ data }) => {
        setCurrentUser({ user: data })
      })
      .catch(err => console.error(err))
  }, [])

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
      {loading && <LinearProgress />}
      {view ? (<RenderRecent show={loading && 'none'} />) : (<RenderFollow />)}

    </>
  )
}

export default Cards
