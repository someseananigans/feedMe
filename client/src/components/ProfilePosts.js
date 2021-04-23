import { useState, useEffect, React } from 'react'
import { Link } from 'react-router-dom'
import { Post, User, Comment as Cmnt } from '../utils/'
import { makeStyles } from '@material-ui/core/styles'
import GridList from "@material-ui/core/GridList"
import GridListTile from "@material-ui/core/GridListTile"
import './ProfPost.css'
import { Typography, Modal, Avatar, CardHeader, CardContent, CardActions, IconButton, FormControlLabel, Checkbox, TextField, Button } from '@material-ui/core'
import { ChatBubbleOutline as ChatIcon, InsertEmoticon, Favorite, FavoriteBorder } from '@material-ui/icons'
import DeleteIcon from '@material-ui/icons/Delete'



const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: theme.palette.background.paper,
    marginTop: 100,
  },
  gridList: {
    width: '80%',
  },
  paper: {
    position: 'absolute',
    width: '800px',
    height: '600px',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  image: {
    height: 'auto',
    width: 425,
  }

}))

const UserProf = ({ id }) => {

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
    console.log(likeAction)
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
    console.log(likeAction)
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
      })
      .catch(err => console.error(err))

    if (!id) {
      Post.getOwned()
        .then(({ data }) => {
          data.reverse()
          const posts = data.map(post => ({
            ...post,
            open: false
          }))
          setPostState({ ...postState, posts })
        })
        .catch(err => { console.log(err) })
    } else {
      User.getUser(id)
        .then(({ data }) => {
          const posts = data.posts.map(post => ({
            ...post,
            open: false
          }))
          setPostState({ ...postState, posts, profile: data.profile, username: data.username })
        })
        .catch(err => { console.log(err) })
    }

    // User.getUser(id)
    //   .then(({ data }) => {
    //     const posts = data.posts.map(post => ({
    //       ...post,
    //       open: false
    //     }))
    //     setPostState({ ...postState, posts, profile: data.profile, username: data.username })
    //   })
    //   .catch(err => { console.log(err) })
  }, [])



  const getModalStyle = () => {
    const top = 50
    const left = 50

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const [modalStyle] = useState(getModalStyle)
  // const [open, setOpen] = useState(false)

  const handleOpen = id => {
    const posts = [...postState.posts]
    posts.forEach(post => {
      if (post._id === id) {
        post.open = true
        likeCheck(post.liked_by)
        setLikeCount(post.liked_by.length ? post.liked_by.length : 0)
      }
    })
    setPostState({ ...postState, posts })
    // setOpen(true);
  };



  const handleForceClose = async function () {
    const res = await new Promise((resolve, reject) => {
      const posts = postState.posts.map(post => ({
        ...post,
        open: false
      }))
      resolve(posts)
    })
    return res
  }
  const handleClose = () => {
    handleForceClose()
      .then(posts => {
        setPostState({ ...postState, posts })
      })
  };

  const [comment, setComment] = useState({
    body: '',
    post_id: ''
  })

  const handleCommentInput = ({ target }) => {
    setComment({ ...comment, body: target.value, post_id: target.id })
    console.log(comment)
  }

  const handleComment1 = () => {
    Cmnt.create({
      comment: comment.body,
      post_id: comment.post_id
    })
      .then(({ data: cmnt }) => {
        setComment({ ...comment, body: '', post_id: '' })
      })
      .catch(err => console.error(err))
  }



  return (
    <>

      <div className={classes.root}>
        <GridList cellHeight={300} className={classes.gridList} cols={3}>
          {postState.posts.length ? postState.posts.map(post => (
            <GridListTile key={post._id} cols={1} className={classes.image} onClick={() => handleOpen(post._id)} >
              <img src={post.image} alt={post.body} />
              <div>
                <Modal
                  open={post.open}
                  onClose={handleClose}

                >
                  <div style={modalStyle} className={classes.paper}>

                    <div className="images">
                      <img src={post.image} alt={post.body} className={classes.image} />
                    </div>
                    <div className='comments'>
                      <ul style={{ listStyle: "none" }}>
                        <li>

                          <CardHeader
                            avatar={
                              <Avatar alt={postState.username} src={postState.profile}>
                              </Avatar>
                            }
                            title={
                              <Link to={`/user/${post.user._id}`} style={{ textDecoration: 'none', color: 'black' }} >
                                {postState.username}
                              </Link>
                            }
                            subheader={post.body}
                          />
                        </li>
                        <hr />
                        <div style={{ overflow: 'scroll', height: '300px' }}>
                          {post.comments.length ? post.comments.map(cmnt => (

                            <li key={cmnt._id} >
                              {/* {console.log(post)} */}
                              {/* {console.log(cmnt)} */}
                              <CardHeader
                                avatar={
                                  <Avatar alt={cmnt.user.username} src={cmnt.user.profile}>
                                  </Avatar>
                                }
                                title={`${cmnt.user.username} ${cmnt.comment}`}

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
                            />
                            <Button onClick={handleComment1}>Post</Button>
                          </CardContent>
                        </div>
                      </ul>
                    </div>
                  </div>
                </Modal>
              </div>
              <div className='overlay'>
                <Typography>
                  {post.body}
                  {/* <DeleteIcon onClick={() => handleDeletePost(post._id)} /> */}
                </Typography>
              </div>
            </GridListTile>
          ))
            : null
          }
        </GridList>
      </div>
    </>
  )
}

export default UserProf