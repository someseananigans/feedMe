import { useRef, useEffect, useState } from 'react'
import {
  Card as PostCard, CardHeader, CardContent, CardActions, IconButton,
  Button, TextField, Avatar, Typography, Checkbox, FormControlLabel, DialogContent, DialogActions, Dialog
} from '@material-ui/core';
import { ChatBubbleOutline as ChatIcon, InsertEmoticon, Favorite, FavoriteBorder, Delete as DeleteIcon } from '@material-ui/icons'
import { User, Comment as Cmnt, Post, FollowContext } from '../../utils'
import { makeStyles } from '@material-ui/core/styles';
import Comment from './Comment'

import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    backgroundColor: 'gray',
    height: '565px',
  },
  halfLeft: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    maxHeight: '480px',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  halfRight: {
    backgroundColor: 'white',
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    maxHeight: '565px',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '575px',
      width: '400px'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  likeCommentSpace: {
    height: '100%',
    padding: '0 16px',
  },
  UserSpace: {
    borderBottom: '1px solid #d8d8d8',
    padding: '9px 11px'
  },
  commentAvatars: {
    height: '25px',
    width: '25px',
    marginRight: '10px'
  },
  commentLine: {
    display: 'flex',
    padding: '6px 0',
    alignItems: 'center'
  },
  commentSpace: {
    overflowY: 'auto',
    height: '330px',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '330px'
    }
  },
  follow: {
    fontSize: 13,
    color: 'blue',
    marginTop: '5px'
  },
  following: {
    fontSize: 13,
    color: 'black',
    marginTop: '5px'
  },
  media: {
    width: "100%",
    // paddingTop: '56.25%', // 16:9
  },
  un: {
    display: 'inline-flex',
    paddingRight: 5,
    color: 'black',
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.54)',
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
  avatar: {
    height: '32px',
    width: '32px',
  },
  postUsername: {
    textDecoration: 'none',
    color: 'black',
    fontWeight: 500
  },
  commentField: {
    width: '80%'
  },
  time: {
    fontSize: '12px'
  }
}
));


const ViewMore = ({ props }) => {
  const styles = useStyles();

  const {
    username,
    usernameLink,
    profile,
    timePassed,
    postId,
    likeDisplay,
    comment,
    handleComment, handleCommentInput,
    cmntList, setCmntList,
    likeCheck, likeAction,
    setLikeCount, handleLike,
    update, setUpdate
  } = props

  const {
    handleFollow, // follow or unfollow
    followAction, // follow or following (updated by followCheck) 
    followCheck, // within Suggested Users, checks to see if user has followed
  } = FollowContext()

  const [currentUser, setCurrentUser] = useState({
    // user: {}
  })

  const [postState, setPostState] = useState({
    user: {
      _id: '',
    },
    liked_by: []
  })

  useEffect(() => {
    if (props.comp == 'ViewMoreProfile') { setCmntList([]) }
    Post.getOne(postId)
      .then(({ data: post }) => {
        setPostState(post)
        setLikeCount(post.liked_by.length)
        setUpdate('Update')
        User.profile()
          .then(({ data }) => {
            setCurrentUser(data)
            followCheck(data.following, post.user._id)
          })
          .catch(err => console.error(err))
      })
    if (props.comp == 'ViewMoreProfile') {
      Cmnt.getFromPost(postId)
        .then(({ data: postComments }) => {
          setCmntList(postComments.reverse())
        })
        .catch(err => {
          console.error(err)
        })
    }
  }, [])

  useEffect(() => {
    if (props.comp == 'ViewMoreProfile') {

      if (currentUser && postState.liked_by) {
        likeCheck(postState.liked_by, currentUser)
      }
    }
  }, [postState, currentUser])

  const Render = () => {

    return (
      <>
        {currentUser._id !== postState.user._id &&
          <Button
            className={followAction === 'follow' ? styles.follow : styles.following}
            onClick={(() => handleFollow(postState.user._id))}
          >
            {followAction}
          </Button>
        }

        {currentUser._id === postState.user._id &&
          <>
            <DeleteIcon onClick={props.toggleDeleteDialog} style={{ marginRight: 7, marginTop: 11 }} />

            <Dialog
              onClose={props.toggleDeleteDialog}
              maxWidth="xs"
              open={props.confirmOpen}
            >
              <DialogContent>
                <h3>Do You Wish to Delete this Post?</h3>
                <img src={postState.image} alt="" style={{ width: '100%', overflowY: 'auto' }} />
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={(() => props.handleConfirm('No', props.postId))} color="primary">
                  No
                    </Button>
                <Button onClick={(() => props.handleConfirm('Yes', props.postId))} color="primary">
                  Yes
                    </Button>
              </DialogActions>
            </Dialog>
          </>
        }

      </>
    )
  }

  let textInput = useRef(null)

  const handleFocus = () => {
    textInput.current.focus()
  }

  return (
    <>
      <PostCard className={styles.container} key={postId}>
        <div className={styles.halfLeft}>

          <div className={styles.imageWrapper}>
            <img
              className={styles.media}
              src={postState.image}
              alt="card content"
            />
          </div>
        </div>

        <div className={styles.halfRight}>

          <CardHeader className={styles.UserSpace}
            avatar={
              <Link to={usernameLink}>
                <Avatar aria-label="userAvatar" className={styles.avatar} src={profile}>
                </Avatar>
              </Link>
            }
            action={currentUser._id && <Render />}
            title={
              <Link to={usernameLink} className={styles.postUsername}>
                {username}
              </Link>
            }
          />

          <CardContent className={styles.likeCommentSpace}>

            <Typography className={styles.commentLine} variant="body2" color="textSecondary" component="div">
              <Avatar aria-label="userAvatar" className={styles.commentAvatars} src={profile}></Avatar>
              <div className={styles.un}>
                {/* caption: */}
                {postState.user.username}
              </div>
              <div className={styles.cap}>
                {postState.body}
              </div>
            </Typography>

            <Typography className={styles.commentSpace} variant="body2" color="textSecondary" component="p">
              {cmntList.map((com, index) => {

                return (
                  <div className={styles.commentLine} >
                    <Avatar aria-label="userAvatar" className={styles.commentAvatars} src={com.user.profile}>
                    </Avatar>
                    <Comment
                      key={com._id}
                      accountName={com.user}
                      comment={com.comment}
                    />
                  </div>
                )
              })}
            </Typography>
            <CardActions disableSpacing className={styles.likeComment}>
              <IconButton aria-label="like" color="default" className={styles.noMargPad}>
                <FormControlLabel className={styles.noMargPad}
                  control={<Checkbox icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    name="checkedH"
                    onClick={(() => handleLike(postId))}
                    checked={likeAction === 'unlike' ? true : false}
                  />}
                />
              </IconButton>
              <IconButton aria-label="comment" onClick={handleFocus}>
                <ChatIcon className={styles.noMargPad} />
              </IconButton>
            </CardActions>
            <strong>{likeDisplay}</strong>
            <Typography variant="body2" color="textSecondary" component="p">
              <div className={styles.time}>
                {timePassed}
              </div>
            </Typography>
          </CardContent>
          <CardContent className={styles.addComment}>
            <IconButton aria-label="comment">
              <InsertEmoticon />
            </IconButton>
            <TextField
              id={postId}
              label="Add a comment..."
              type="comment"
              value={comment.post_id === postId ? comment.body : ""}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  handleComment()
                }
              }}
              onChange={handleCommentInput}
              className={styles.commentField}
              inputRef={textInput}
            />
            <Button onClick={handleComment}>Post</Button>

          </CardContent>

        </div>

      </PostCard>
    </>
  )
}

export default ViewMore
