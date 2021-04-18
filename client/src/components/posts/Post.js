import { React, useState, useEffect } from 'react'
import Post from '../../utils/Post.js'
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardHeader, CardMedia,
  CardContent, CardActions, IconButton, Button, TextField,
  Avatar, Typography, Box, Grid
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/ChatBubbleOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon'
import DeleteIcon from '@material-ui/icons/Delete';





const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    marginBottom: 20,
    height: "100%"
  },
  media: {
    width: "100%",
    // paddingTop: '56.25%', // 16:9
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  un: {
    display: 'inline-flex',
    paddingRight: 5,
    color: 'black'
  },
  cap: {
    display: 'inline-flex'
  },
  imageWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative",
    justifyContent: "center"
  }
}));



const Posts = () => {

  const classes = useStyles()
  const [postState, setPostState] = useState({
    posts: []
  })

  const handleDeletePost = id => {
    Post.delete(id)
      .then(() => {
        window.location = '/profile'
        const posts = [postState.posts]
        setPostState({ ...postState, posts })

      })
      .catch(err => console.log(err))
  }

  useEffect(async () => {
    await Post.getAll()
      .then(({ data: grams }) => {
        setPostState({ ...postState, posts: grams })
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return (

    <Box xs={12} xl={12} lg={12} md={12} >
      {
        postState.posts.length
          ? postState.posts.map(post => (
            <Card className={classes.root} key={post._id}>
              <CardHeader
                avatar={
                  <Avatar aria-label="userAvatar" className={classes.avatar}>
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={post.user.username}
              />
              <div className={classes.imageWrapper}>
                {/* <CardMedia
                  className={classes.media}
                  image={post.image}
                /> */}
                <img
                  className={classes.media}
                  src={post.image}
                  alt="your image"
                />
              </div>
              <CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="like">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="comment">
                    <ChatIcon />
                  </IconButton>
                </CardActions>

                <Typography variant="body2" color="textSecondary" component="p">
                  <div className={classes.un}>
                    {post.user.username}
                  </div>
                  <div className={classes.cap}>
                    {post.body}
                  </div>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {post.comments.length && post.comments[0].comment}
                </Typography>
              </CardContent>
              <CardContent>
                <IconButton aria-label="comment">
                  <InsertEmoticon />
                </IconButton>
                <TextField
                  id="standard-input"
                  label="Add a comment..."
                  type="comment"
                />
                <Button>Post</Button>
                <DeleteIcon onClick={() => handleDeletePost(post._id)} />
              </CardContent>
            </Card>
          ))
          : null
      }
    </Box>
  )

}

export default Posts