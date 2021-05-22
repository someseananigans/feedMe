import { useEffect } from 'react'

// Library
import { makeStyles } from '@material-ui/core/styles';
import human from 'human-time'

// Utils
import { Comment as Cmnt, FollowContext } from '../../utils'

// Components
import Comment from './Comment'
// import Modal from '../modals/Modal'
import { Modal } from '../'
import { Link } from 'react-router-dom'
import {
  Card as PostCard,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Button,
  TextField,
  Avatar,
  Typography,
  Checkbox,
  FormControlLabel
} from '@material-ui/core';
import {
  MoreHoriz,
  InsertEmoticon,
  Favorite,
  FavoriteBorder
} from '@material-ui/icons'


const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 20,
    height: "100%",
    backgroundColor: '#fff',
    border: '1px solid #80808042',
    borderRadius: 0,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 0,
      border: 'none',
      borderTop: '.5px solid #80808042'
    }
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
  }, time: {
    fontSize: '12px'
  }
}));

const Card = (props) => {
  const classes = useStyles()

  const {
    profile,
    username,
    image,
    userId,
    created_on,
    caption,
    likedByNumber,
    postId,
    likedByUsers,
    currentUser
  } = props

  const {
    likeAction,
    likeCount, setLikeCount,
    likeCheck,
    handleLike,
    comment,
    commentList, setCommentList,
    handleComment,
    handleCommentInput,
    update, setUpdate
  } = FollowContext()

  // renders on page load and re-renders when update is triggered
  useEffect(() => {
    Cmnt.getFromPost(postId)
      .then(({ data: postComments }) => {
        setCommentList(postComments.reverse())
        setUpdate('Up-to-Date')
      })
      .catch(err => {
        console.error(err)
      })
    setLikeCount(likedByNumber)
  }, [update])

  useEffect(() => {
    likeCheck(likedByUsers, currentUser)
  }, [])


  return (
    <div>
      <PostCard className={classes.root} key={postId}>
        <CardHeader className={classes.cardHeader}
          avatar={
            <Link to={currentUser._id === userId ? ('/profile') : (`/${userId}`)}>
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
            <Link to={currentUser._id === userId ? ('/profile') : (`/${userId}`)} className={classes.postUsername}>
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
                  onClick={(() => handleLike(postId))}
                  checked={likeAction === 'unlike' ? true : false}
                />}
              />
            </IconButton>
            <Modal
              classes={classes}
              comp="ViewMore"

              username={username}
              usernameLink={currentUser._id === userId ? ('/profile') : (`/${userId}`)}
              profile={profile}
              timePassed={(human((Date.now() - created_on) / 1000))}
              postId={postId}

              handleLike={handleLike}
              setLikeCount={setLikeCount}
              likeCheck={likeCheck}
              likeAction={likeAction}
              likeDisplay={likeCount !== 1 ? `${likeCount} likes` : '1 like'}

              cmntList={commentList}
              setCmntList={setCommentList}
              handleComment={handleComment}
              handleCommentInput={handleCommentInput}
              comment={comment}
              currentUser={currentUser}
              update={update}
              setUpdate={setUpdate}
            />
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
            {/* {commentList.length > 1 ? `View all ${commentList.length} comments` : null} */}
            <Modal
              classes={classes}
              comp="ViewMore2"

              username={username}
              usernameLink={currentUser._id === userId ? ('/profile') : (`/${userId}`)}
              profile={profile}
              timePassed={(human((Date.now() - created_on) / 1000))}
              postId={postId}

              handleLike={handleLike}
              setLikeCount={setLikeCount}
              likeCheck={likeCheck}
              likeAction={likeAction}
              likeDisplay={likeCount !== 1 ? `${likeCount} likes` : '1 like'}

              cmntList={commentList}
              setCmntList={setCommentList}
              commentList={commentList}
              handleComment={handleComment}
              handleCommentInput={handleCommentInput}
              comment={comment}
              currentUser={currentUser}
              update={update}
              setUpdate={setUpdate}
            />
            {commentList.map((com, index) => {
              if (index < 3) {
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
              {human((Date.now() - created_on) / 1000)}
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
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                handleComment()
              }
            }}
          />
          <Button onClick={handleComment}>Post</Button>

        </CardContent>

      </PostCard>
    </div>
  )
}

export default Card
