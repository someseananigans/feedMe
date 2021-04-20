import { React, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
  Card as PostCard, CardHeader, CardContent, CardActions, IconButton,
  Button, TextField, Avatar, Typography, Checkbox, FormControlLabel
} from '@material-ui/core';
import { ChatBubbleOutline as ChatIcon, MoreVert as MoreVertIcon, InsertEmoticon, Favorite, FavoriteBorder } from '@material-ui/icons'
import Comment from './Comment'
import { Link } from 'react-router-dom'
import { Comment as Cmnt, Post, User } from '../../utils'


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
  noMargPad: {
    padding: 0,
    margin: 0
  },
  likeComment: {
    padding: 0,
    margin: 0,
    marginLeft: '-10px'
  },
  addComment: {
    display: 'flex',
    paddingBottom: '20px !important',
    paddingTop: 0,
  },
  likeCommentField: {
    paddingTop: '5px',
    paddingBottom: '5px'
  }
}));


const Card = (props) => {
  const classes = useStyles()

  const {
    profile,
    username,
    image,
    userId,
    // hours,
    caption,
    likedByNumber,
    postId,
    likedByUsers,
    update,
    setUpdate,
    currentUser,
    setCurrentUser
  } = props

  const [comment, setComment] = useState({
    body: '',
    post_id: '',
    list: []
  })

  // const [currentUser, setCurrentUser] = useState({
  //   user: {}
  // })

  // const [likeState, setLikeState] = useState({
  //   likes: likedByNumber
  // })

  // const [update, setUpdate] = useState('Comments are Up-to-Date')

  useEffect(() => {
    Cmnt.getFromPost(postId)
      .then(({ data: postComments }) => {
        setComment({ ...comment, list: postComments })
        setUpdate('Up-to-Date')
      })
      .catch(err => {
        console.error(err)
      })
  }, [update])

  // useEffect(() => {
  //   User.profile()
  //     .then(({ data }) => {
  //       setCurrentUser({ user: data })
  //       setUpdate('Up-to-Date')
  //     })
  //     .catch(err => console.error(err))
  // }, [update])

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
        setUpdate('Need Update')
      })
      .catch(err => console.error(err))
  }

  const handleLike = () => {
    let type = 'like'
    likedByUsers.forEach(liker => {
      if (liker == currentUser.user._id) {
        type = 'unlike'
      }
    })
    User.touchPost({
      type,
      user_id: currentUser.user._id,
      post_id: postId
    })
      .then(data => {
        setUpdate('Need Update')
      })
      .catch(err => console.log(err))
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
          title={
            <Link to={`/user/${userId}`} style={{ textDecoration: 'none', color: 'black' }}>
              {username}
            </Link>
          }
        />
        <div className={classes.imageWrapper}>
          <img
            className={classes.media}
            src={image}
            alt="card content"
          />
        </div>

        <CardContent className={classes.likeCommentField}>
          <CardActions disableSpacing className={classes.likeComment}>
            <IconButton aria-label="like" color="danger" className={classes.noMargPad}>
              <FormControlLabel className={classes.noMargPad}
                control={<Checkbox icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  name="checkedH" 
                  onClick={handleLike}
                  checked={likedByUsers.indexOf(currentUser.user._id) != -1}
                  />}
              />
            </IconButton>
            <IconButton aria-label="comment">
              <ChatIcon className={classes.noMargPad} />
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
              if (comment.list.length <= index + 3) {
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
        <CardContent className={classes.addComment}>
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
