import { React, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
  Card as PostCard, CardHeader, CardContent, CardActions, IconButton,
  Button, TextField, Avatar, Typography, Checkbox, FormControlLabel
} from '@material-ui/core';
import { ChatBubbleOutline as ChatIcon, MoreHoriz, InsertEmoticon, Favorite, FavoriteBorder } from '@material-ui/icons'
import Comment from './Comment'
import { Link } from 'react-router-dom'
import { Comment as Cmnt, User } from '../../utils'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 20,
    height: "100%",
    backgroundColor: '#fff'
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
    width: 'auto',
    display: 'flex',
    padding: 0,
    paddingBottom: '15px !important',
    justifyContent: 'center'
  },
  likeCommentField: {
    paddingTop: '5px',
    paddingBottom: '5px'
  },
  avatar: {
    height: '32px',
    width: '32px',
  }, 
  postUsername: {
    textDecoration: 'none', 
    color: 'black',
    fontWeight: 500
  },
  cardHeader: {
    paddingTop: '9px',
    paddingBottom: '9px'
  },
  commentField: {
    width: '80%'
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
    comment,
    handleCommentInput,
    handleComment
  } = props

  const [commentList, setCommentList] = useState([])
  const [likeAction, setLikeAction] = useState(false)
  const [likeCount, setLikeCount] = useState(likedByNumber)
  
  const likeCheck = () => {
    setLikeAction(likedByUsers.indexOf(currentUser.user._id) !== -1 ? 'unlike' : 'like')
  }

  // renders on page load and re-renders when update is triggered
  useEffect(() => {
    Cmnt.getFromPost(postId)
      .then(({ data: postComments }) => {
        setCommentList(postComments)
        setUpdate('Up-to-Date' )
        // initial like check
        likeCheck()
      })
      .catch(err => {
        console.error(err)
      })
  }, [update])

  const handleLike = async () => {
    await User.touchPost({
      type: likeAction,
      post_id: postId
    })
      .then()
      .catch(err => console.log(err))
    setLikeCount(likeAction == 'like' ? (likeCount + 1) : (likeCount - 1))
    setLikeAction(likeAction == 'like' ? 'unlike' : 'like')
    console.log(likeAction)
  }

  return (
    <div>
      <PostCard className={classes.root} key={postId}>
        <CardHeader className={classes.cardHeader}
          avatar={
            <Link to={`/user/${userId}`}>
            <Avatar aria-label="userAvatar" className={classes.avatar} src={profile}>
            </Avatar>
            </Link>
          }
          action={
            <IconButton aria-label="settings">
              <MoreHoriz />
            </IconButton>
          }
          title={
            <Link to={`/user/${userId}`} className={classes.postUsername}>
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
            <IconButton aria-label="like" color="default" className={classes.noMargPad}>
              <FormControlLabel className={classes.noMargPad}
                control={<Checkbox icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  name="checkedH"
                  onClick={handleLike}
                  checked={likeAction == 'unlike' ? true : false}
                />}
              />
            </IconButton>
            <IconButton aria-label="comment">
              <ChatIcon className={classes.noMargPad} />
            </IconButton>
          </CardActions>

          <strong>{likeCount !== 1 ? `${likeCount} likes` : '1 like'}</strong>
          <Typography variant="body2" color="textSecondary" component="p">
            <div className={classes.un}>
              {username}
            </div>
            <div className={classes.cap}>
              {caption}
            </div>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {commentList.length > 1 ? `View all ${commentList.length} comments` : null}
            {commentList.map((com, index) => {
              if (commentList.length <= index + 3) {
                return (
                  <Comment
                    key={com._id}
                    accountName={com.user}
                    comment={com.comment}
                  />
                )
              } else return null
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
            value={comment.post_id === postId ? comment.body : ""}
            onChange={handleCommentInput}
            className={classes.commentField}
          />
          <Button onClick={handleComment}>Post</Button>

        </CardContent>

      </PostCard>
    </div>
  )
}

export default Card
