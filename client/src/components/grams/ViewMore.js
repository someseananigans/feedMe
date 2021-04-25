import { useState, useRef, useEffect } from 'react'
import {
  Card as PostCard, Dialog, CardHeader, CardContent, CardActions, IconButton,
  Button, TextField, Avatar, Typography, Checkbox, FormControlLabel
} from '@material-ui/core';
import { ChatBubbleOutline as ChatIcon, MoreHoriz, InsertEmoticon, Favorite, FavoriteBorder } from '@material-ui/icons'
import { User, Comment as Cmnt } from '../../utils'
import { makeStyles } from '@material-ui/core/styles';
import Comment from './Comment'
import { FollowContext } from '../../utils'

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
    borderBottom: '1px solid gray',
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
      maxHeight: '300px'
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
    handleLike,
    likeAction,
    likeDisplay,
    username,
    caption,
    usernameLink,
    profile,
    image,
    commentList,
    timePassed,
    postId,
    handleComment,
    handleCommentInput,
    comment,
    userId,
    currentUser,
    update,
    setUpdate
  } = props

  const {
    handleFollow, // follow or unfollow
    followAction, // follow or following (updated by followCheck) 
    followCheck, // within Suggested Users, checks to see if user has followed
  } = FollowContext()

  const [cmntList, setCmntList] = useState([])


  useEffect(() => {
    User.profile()
      .then(({ data: user }) => {
        followCheck(user.following, userId)
      })
    Cmnt.getFromPost(postId)
      .then(({ data: postComments }) => {
        setCmntList(postComments.reverse())
        setUpdate('Up-to-Date')
      })
      .catch(err => {
        console.error(err)
      })
  }, [update])

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
              src={image}
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
            action={
              currentUser.user._id !== userId &&
              (<Button
                className={followAction === 'follow' ? styles.follow : styles.following}
                onClick={(() => handleFollow(userId))}
              >
                {followAction}
              </Button>)
            }
            title={
              <Link to={usernameLink} className={styles.postUsername}>
                {username}
              </Link>
            }
          />

          <CardContent className={styles.likeCommentSpace}>
            <CardActions disableSpacing className={styles.likeComment}>
              <IconButton aria-label="like" color="default" className={styles.noMargPad}>
                <FormControlLabel className={styles.noMargPad}
                  control={<Checkbox icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    name="checkedH"
                    onClick={handleLike}
                    checked={likeAction === 'unlike' ? true : false}
                  />}
                />
              </IconButton>
              <IconButton aria-label="comment" onClick={handleFocus}>
                <ChatIcon className={styles.noMargPad} />
              </IconButton>
            </CardActions>

            <strong>{likeDisplay}</strong>
            <Typography className={styles.commentLine} variant="body2" color="textSecondary" component="p">
              <Avatar aria-label="userAvatar" className={styles.commentAvatars} src={profile}></Avatar>
              <div className={styles.un}>
                {username}
              </div>
              <div className={styles.cap}>
                {caption}
              </div>
            </Typography>

            <Typography className={styles.commentSpace} variant="body2" color="textSecondary" component="p">
              {/* {commentList.map((com, index) => {

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

              })} */}
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