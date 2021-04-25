import { useState, useRef, useEffect } from 'react'
import {
  Card as PostCard, Dialog, CardHeader, CardContent, CardActions, IconButton,
  Button, TextField, Avatar, Typography, Checkbox, FormControlLabel
} from '@material-ui/core';
import { ChatBubbleOutline as ChatIcon, MoreHoriz, InsertEmoticon, Favorite, FavoriteBorder } from '@material-ui/icons'
import { User } from '../../utils'
import { makeStyles } from '@material-ui/core/styles';
import Comment from './Comment'

import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
  },
  halfLeft: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    maxHeight: '480px',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  halfRight: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    maxHeight: '480px',
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
    height: '233px',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '300px'
    }
  }
}
));


const ViewMore = ({ props }) => {
  const styles = useStyles();

  const {
    classes,
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
    comment
  } = props


  let textInput = useRef(null)

  const handleFocus = () => {
    textInput.current.focus()
  }

  return (
    <>
      <PostCard className={styles.container} key={postId}>
        <div className={styles.halfLeft}>

          <div className={classes.imageWrapper}>
            <img
              className={classes.media}
              src={image}
              alt="card content"
            />
          </div>
        </div>

        <div className={styles.halfRight}>


          <CardHeader className={styles.UserSpace}
            avatar={
              <Link to={usernameLink}>
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
              <Link to={usernameLink} className={classes.postUsername}>
                {username}
              </Link>
            }
          />

          <CardContent className={styles.likeCommentSpace}>
            <CardActions disableSpacing className={classes.likeComment}>
              <IconButton aria-label="like" color="default" className={classes.noMargPad}>
                <FormControlLabel className={classes.noMargPad}
                  control={<Checkbox icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    name="checkedH"
                    onClick={handleLike}
                    checked={likeAction === 'unlike' ? true : false}
                  />}
                />
              </IconButton>
              <IconButton aria-label="comment" onClick={handleFocus}>
                <ChatIcon className={classes.noMargPad} />
              </IconButton>
            </CardActions>

            <strong>{likeDisplay}</strong>
            <Typography className={styles.commentLine} variant="body2" color="textSecondary" component="p">
              <Avatar aria-label="userAvatar" className={styles.commentAvatars} src={profile}></Avatar>
              <div className={classes.un}>
                {username}
              </div>
              <div className={classes.cap}>
                {caption}
              </div>
            </Typography>

            <Typography className={styles.commentSpace} variant="body2" color="textSecondary" component="p">

              {commentList.map((com, index) => {

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
              <div className={classes.time}>
                {timePassed}
              </div>
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
