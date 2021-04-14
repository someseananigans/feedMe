import { React, useState, useEffect } from 'react'
// import { Post } from '../../utils/Post.js'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, 
  CardContent, CardActions, IconButton, Button, TextField,
  Avatar, Typography }from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/ChatBubbleOutline'; 
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticon from '@material-ui/icons/InsertEmoticonIcon'
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Posts = () => {

  const classes = useStyles()
  const [postState, setPostState] = useState({
    body: '',
    image: '',
    comments: '',
    posts: []
  })

  // useEffect(() => {
  //   Post.getAll()
  //     .then(({ data: posts }) => {
  //       console.log(posts)
  //       setPostState({ ...postState, posts })
  //     })
  //     .catch(err => {
  //       console.error(err)
  //       window.location = '/login'
  //     })
  // }, [])

  return (
    <>

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
            <CardMedia
              className={classes.media}
              image={post.image}
            />
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
                {post.user.username}{post.caption}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {post.comments}
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
            </CardContent>
          </Card>
        ))
       : null
      }
    </>
  )

}

export default Posts