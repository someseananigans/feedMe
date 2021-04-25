import { useState, useRef, useEffect } from 'react'
import {
  Card as PostCard, Dialog, CardHeader, CardContent, CardActions, IconButton,
  Button, TextField, Avatar, Typography, Checkbox, FormControlLabel
} from '@material-ui/core';
import { ChatBubbleOutline as ChatIcon, MoreHoriz, InsertEmoticon, Favorite, FavoriteBorder } from '@material-ui/icons'
import { Comment, User } from '../../utils'

import { Link } from 'react-router-dom'



const ViewMoreModal = ({ props }) => {

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
      <PostCard className={classes.root} key={postId}>
        <CardHeader className={classes.cardHeader}
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
                  checked={likeAction === 'unlike' ? true : false}
                />}
              />
            </IconButton>
            <IconButton aria-label="comment" onClick={handleFocus}>
              <ChatIcon className={classes.noMargPad} />
            </IconButton>
          </CardActions>

          <strong>{likeDisplay}</strong>
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

      </PostCard>




    </>
  )
}

export default ViewMoreModal
