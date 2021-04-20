import { React, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
  Card as PostCard, CardHeader, CardContent, CardActions, IconButton,
  Button, TextField, Avatar, Typography, Checkbox, FormControlLabel
} from '@material-ui/core';
import { ChatBubbleOutline as ChatIcon, MoreVert as MoreVertIcon, InsertEmoticon,  Favorite, FavoriteBorder } from '@material-ui/icons'
import Comment from './Comment'
import { Comment as Cmnt, Post } from '../../utils'


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
  },
  button: {
    padding: 0,
    margin: 0
  }, 
}));


const Card = (props) => {
  const classes = useStyles()

  const {
    profile,
    username,
    image,
    // hours,
    caption,
    likedByNumber,
    postId
  } = props

  const [comment, setComment] = useState({
    body: '',
    post_id: '',
    list: []
  })

  const [update, setUpdate] = useState('Comments are Up-to-Date')

  useEffect(() => {
    Cmnt.getFromPost(postId)
      .then(({ data: postComments }) => {
        console.log('ping')
        setComment({ ...comment, list: postComments })
        setUpdate('Comments are Up-to-Date')
        console.log(postComments)
      })
      .catch(err => {
        console.error(err)
      })
  }, [update])

  const handleCommentInput = ({ target }) => {
    setComment({ ...comment, body: target.value, post_id: target.id })
    console.log(comment)
  }

  const handleComment = () => {
    Cmnt.create({
      comment: comment.body,
      post_id: comment.post_id
    })
      .then(({ data: cmnt }) => {
        console.log(cmnt)
        setComment({ ...comment, body: '', post_id: '' })
        setUpdate('Comments Need Update')
        console.log(comment)
      })
      .catch(err => console.error(err))
  }

  return (
    <div>
      <PostCard className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="userAvatar" className={classes.avatar} src={profile}>
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={username}
        />
        <div className={classes.imageWrapper}>
          <img
            className={classes.media}
            src={image}
            alt="card content"
          />
        </div>

        <CardContent>
          <CardActions disableSpacing className={classes.button}>
            <IconButton aria-label="like" color="danger" className={classes.button}>
              <FormControlLabel
                control={<Checkbox icon={<FavoriteBorder className={classes.button} />}
                  checkedIcon={<Favorite className={classes.button} />}
                  name="checkedH" />}
              />
            </IconButton>
            <IconButton aria-label="comment">
              <ChatIcon className={classes.button} />
            </IconButton>
          </CardActions>

          <strong>{likedByNumber != 1 ? `${likedByNumber} likes` : '1 like'}</strong>
          <Typography variant="body2" color="textSecondary" component="p">
            <div className={classes.un}>
              {username}
            </div>
            <div className={classes.cap}>
              {caption}
            </div>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {comment.list.length > 1 ? `View all ${comment.list.length} comments` : null}
            {comment.list.map((com, index) => {
              if (comment.list.length <= index+3) {
                return (
                  <Comment
                    key={com._id}
                    accountName={com.user}
                    comment={com.comment}
                  />
                )
              }
            })}
          </Typography>
        </CardContent>
        <CardContent>
          <IconButton aria-label="comment">
            <InsertEmoticon />
          </IconButton>
          <TextField
            id={postId}
            label="Add a comment..."
            type="comment"
            value={comment.post_id == postId ? comment.body : ""}
            onChange={handleCommentInput}
          />
          <Button onClick={handleComment}>Post</Button>

        </CardContent>

      </PostCard>
    </div>
  )
}

export default Card
