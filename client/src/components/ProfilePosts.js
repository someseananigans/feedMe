import { useState, useEffect, React } from 'react'
import { Link } from 'react-router-dom'
import { Post, User, Comment as Cmnt, FollowContext } from '../utils/'
import { makeStyles } from '@material-ui/core/styles'
import Grid from "@material-ui/core/Grid"
import GridListTile from "@material-ui/core/GridListTile"
import './ProfPost.css'
import { Typography, Avatar, CardHeader, CardContent, CardActions, IconButton, FormControlLabel, Modal as Modal1, Checkbox, TextField, Button } from '@material-ui/core'
import { ChatBubbleOutline as ChatIcon, InsertEmoticon, Favorite, FavoriteBorder } from '@material-ui/icons'
import human from 'human-time'
import Modal from './modals/Modal'



const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: '#fafafa',
    marginTop: 50,
    marginBottom: 50,
  },
  gridList: {
    width: '95%',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  paper: {
    position: 'absolute',
    width: '800px',
    height: '550px',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  image: {
    height: 'auto',
    width: '100%',
  },
  gridItem: {
    height: '300px',
    width: '300px',
    position: 'relative',
    objectFit: 'cover',
    margin: '20px',
    [theme.breakpoints.down('sm')]: {
      height: '200px',
      width: '200px',
      margin: '5px'
    }
  },
  imageHome: {
    height: '300px',
    width: '300px',
    position: 'relative',
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
      height: '200px',
      width: '200px',
    }
  },
  imageWrapper: {
    alignSelf: 'center',
    width: '50%',
    float: 'left',
    maxHeight: '100%',
    marginBottom: '-1px',
    overflow: 'hidden'
  },
  noMargPad: {
    padding: 0,
    margin: 0
  },
  likeCommentField: {
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingLeft: '20px'
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
  commentField: {
    width: '80%'
  },
  follow: {
    fontSize: 13,
    color: 'blue'
  },
  following: {
    fontSize: 13,
    color: 'black'
  },

}))

const ProfilePosts = ({ id }) => {

  const {
    handleFollow, // follow or unfollow
    followAction, // follow or following (updated by followCheck) 
    followCheck, // within Suggested Users, checks to see if user has followed
  } = FollowContext()

  const classes = useStyles()


  const [postState, setPostState] = useState({
    posts: [],
    username: '',
    profile: '',
  })

  const [likeAction, setLikeAction] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [currentUser, setCurrentUser] = useState({
    user: {}
  })

  const likeCheck = (likedByUsers) => {
    setLikeAction(likedByUsers.indexOf(currentUser.user._id) !== -1 ? 'unlike' : 'like')
  }

  const handleLike = async (postId) => {
    await User.touchPost({
      type: likeAction,
      post_id: postId
    })
      .then()
      .catch(err => console.log(err))
    setLikeCount(likeAction === 'like' ? (likeCount + 1) : (likeCount - 1))
    setLikeAction(likeAction === 'like' ? 'unlike' : 'like')
  }

  const handleDeletePost = id => {
    Post.delete(id)
      .then(() => {
        window.location = '/profile'
        const posts = [postState.posts]
        setPostState({ ...postState, posts })

      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    User.profile()
      .then(({ data }) => {
        setCurrentUser({ user: data })
        User.getUser(id ? id : data._id)
          .then(({ data }) => {
            const posts = data.posts.map(post => ({
              ...post,
              open: false
            }))
            posts.reverse()
            setPostState({ ...postState, posts, profile: data.profile, username: data.username })
          })
          .catch(err => { console.log(err) })
      })
      .catch(err => console.error(err))
  }, [])


  // // part of original modal
  // const getModalStyle = () => {
  //   const top = 50
  //   const left = 50

  //   return {
  //     top: `${top}%`,
  //     left: `${left}%`,
  //     transform: `translate(-${top}%, -${left}%)`,
  //     padding: 0,
  //     border: 'transparent',
  //     display: 'flex',
  //   };
  // }
  // const [modalStyle] = useState(getModalStyle)


  // const [open, setOpen] = useState(false)

  const handleOpen = id => {
    const posts = [...postState.posts]
    posts.forEach(post => {
      if (post._id === id) {
        post.open = true
        likeCheck(post.liked_by)
        setLikeCount(post.liked_by.length ? post.liked_by.length : 0)
        followCheck(currentUser.user.following, post.user)

      }
    })
    setPostState({ ...postState, posts })
    // setOpen(true);
  };


  // // part of original Modal
  // const handleForceClose = async function () {
  //   const res = await new Promise((resolve, reject) => {
  //     const posts = postState.posts.map(post => ({
  //       ...post,
  //       open: false
  //     }))
  //     resolve(posts)
  //   })
  //   return res
  // }

  // const handleClose = () => {
  //   handleForceClose()
  //     .then(posts => {
  //       setPostState({ ...postState, posts })
  //     })
  // };

  const [comment, setComment] = useState({
    body: '',
    post_id: ''
  })

  const [update, setUpdate] = useState('')


  const handleCommentInput = ({ target }) => {
    setComment({ ...comment, body: target.value, post_id: target.id })
  }

  const handleComment = () => {
    Cmnt.create({
      comment: comment.body,
      post_id: comment.post_id
    })
      .then(({ data: cmnt }) => {
        setUpdate('Need Update')
        setComment({ ...comment, body: '', post_id: '' })
      })
      .catch(err => console.error(err))
  }


  return (
    <>

      <div className={classes.root}>
        <Grid container cellHeight={300} className={classes.gridList}>
          {postState.posts.length ? postState.posts.map(post => (
            <Grid item key={post._id} className={classes.gridItem} onClick={() => handleOpen(post._id)} >
              <img src={post.image} alt={post.body} className={classes.imageHome} />
              <div>
                {/* <Modal1
                  classes={classes}
                  open={post.open}
                  comp="ViewMoreProfile"
                  handleLike={handleLike}
                  likeAction={likeAction}
                  likeDisplay={likeCount !== 1 ? `${likeCount} likes` : '1 like'}
                  username={postState.username}
                  caption={post.body}
                  usernameLink={currentUser.user._id === post.user ? ('/profile') : (`/${post.user}`)}
                  profile={postState.profile}
                  image={post.image}
                  commentList={post.comments}
                  timePassed={(human((Date.now() - post.created_On) / 1000))}
                  postId={post._id}
                  userId={post.user}
                  handleComment={handleComment}
                  handleCommentInput={handleCommentInput}
                  comment={comment}
                  currentUser={currentUser}
                /> */}
                {/* <Modal1
                  open={post.open}
                  onClose={handleClose}
                >
                  <div style={modalStyle} className={classes.paper}>

                    <div className={classes.imageWrapper}>
                      <img src={post.image} alt={post.body} className={classes.image} />
                    </div>
                    <div className='comments'>
                      <ul style={{ listStyle: "none", paddingInlineStart: 0 }}>
                        <li >

                          <CardHeader
                            avatar={
                              <Avatar alt={postState.username} src={postState.profile}>
                              </Avatar>
                            }
                            title={
                              <Link to={`/${post.user}`} style={{ textDecoration: 'none', color: 'black' }} >
                                <strong>{postState.username}</strong>
                              </Link>
                            }
                            action={id && (
                              <Button
                                className={followAction === 'follow' ? classes.follow : classes.following}
                                onClick={(() => handleFollow(post.user))}
                              >
                                {followAction}
                              </Button>)
                            }
                          />
                        </li>
                        <hr style={{ width: '80%' }} />

                        <div style={{ overflowY: 'auto', height: '300px', padding: '0 15px' }}>
                          <li>
                            <CardHeader
                              style={{ padding: '5px' }}
                              avatar={
                                <Avatar style={{ height: '25px', width: '25px' }} alt={postState.username} src={postState.profile}>
                                </Avatar>
                              }
                              title={
                                <>
                                  <strong>{postState.username} </strong>
                                  <span> {post.body}</span>
                                </>
                              }

                            />
                          </li>
                          {post.comments.length ? post.comments.map(cmnt => (

                            <li key={cmnt._id} >
                              <CardHeader
                                style={{ padding: '5px' }}
                                avatar={
                                  <Avatar style={{ height: '25px', width: '25px' }} alt={cmnt.user.username} src={cmnt.user.profile}>
                                  </Avatar>
                                }
                                title={
                                  <>
                                    <strong>{cmnt.user.username} </strong>
                                    <span> {cmnt.comment}</span>
                                  </>
                                }

                              />
                            </li>
                          )) : null}
                        </div>
                        <div>


                          <CardContent className={classes.likeCommentField}>
                            <CardActions disableSpacing className={classes.likeComment}>
                              <IconButton aria-label="like" color="default" className={classes.noMargPad}>
                                <FormControlLabel className={classes.noMargPad}
                                  control={<Checkbox icon={<FavoriteBorder />}
                                    checkedIcon={<Favorite />}
                                    name="checkedH"
                                    onClick={(() => handleLike(post._id))}
                                    checked={likeAction === 'unlike' ? true : false}

                                  />}
                                />
                              </IconButton>
                              <IconButton aria-label="comment">
                                <ChatIcon className={classes.noMargPad} />
                              </IconButton>
                            </CardActions>
                            <strong>{likeCount !== 1 ? `${likeCount} likes` : '1 like'}</strong>
                          </CardContent>
                          <CardContent className={classes.addComment}>
                            <IconButton aria-label="comment">
                              <InsertEmoticon />
                            </IconButton>
                            <TextField
                              id={post._id}
                              label="Add a comment..."
                              type="comment"
                              onChange={handleCommentInput}
                              value={comment.body}
                              className={classes.commentField}
                            />
                            <Button onClick={handleComment}>Post</Button>
                          </CardContent>
                        </div>
                      </ul>
                    </div>
                  </div>
                </Modal1> */}
              </div>
              {/* <div className='overlay'>
                <Typography>
                  {post.body}
                  {currentUser.user._id === post.user ? (

                    <DeleteIcon onClick={() => handleDeletePost(post._id)} />
                  ) : null}
                </Typography>
              </div> */}
              <Modal
                classes={classes}
                open={post.open}
                comp="ViewMoreProfile"
                handleLike={handleLike}
                likeAction={likeAction}
                likeDisplay={likeCount !== 1 ? `${likeCount} likes` : '1 like'}
                username={postState.username}
                caption={post.body}
                usernameLink={currentUser.user._id === post.user ? ('/profile') : (`/${post.user}`)}
                profile={postState.profile}
                image={post.image}
                commentList={post.comments}
                timePassed={(human((Date.now() - post.created_On) / 1000))}
                postId={post._id}
                userId={post.user}
                handleComment={handleComment}
                handleCommentInput={handleCommentInput}
                comment={comment}
                currentUser={currentUser}
                handleDeletePost={handleDeletePost}
                setUpdate={setUpdate}
                update={update}
              />
            </Grid>
          ))
            : null
          }
        </Grid>
      </div>
    </>
  )
}

export default ProfilePosts