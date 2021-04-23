import { useState, useEffect, React } from 'react'
import { Link } from 'react-router-dom'
import { Post, User, Comment as Cmnt } from '../utils/'
import { makeStyles } from '@material-ui/core/styles'
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import './ProfPost.css'
import { Typography, Modal, Avatar, CardHeader, CardContent, CardActions, IconButton, FormControlLabel, Checkbox, TextField, Button } from '@material-ui/core';
import { ChatBubbleOutline as ChatIcon, InsertEmoticon, Favorite, FavoriteBorder } from '@material-ui/icons'
import DeleteIcon from '@material-ui/icons/Delete';
// import Comment from './grams/Comment'



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
    height: 525,
    width: 425
  }

}))

const ProfilePosts = (props) => {

  const classes = useStyles()
  const [postState, setPostState] = useState({
    posts: []
  })
  const [update, setUpdate] = useState('')
  useEffect(() => {

    Post.getOwned()
      .then(({ data }) => {
        const posts = data.map(post => ({
          ...post,
          open: false
        }))
        setPostState({ ...postState, posts })
      })
      .catch(err => { console.log(err) })

  }, [update])

  const handleDeletePost = id => {

    Post.delete(id)
      .then(() => {
        window.location = '/profile'
        const posts = [postState.posts]
        setPostState({ ...postState, posts })

      })
      .catch(err => console.log(err))
  }



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




  return (
    <>
      <div className={classes.root}>
        <GridList cellHeight={300} className={classes.gridList} cols={3}>
          {postState.posts.length ? postState.posts.map(post => (
            <GridListTile key={post._id} cols={1} className={classes.image} onClick={() => handleOpen(post._id)}  >
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
                              <Avatar alt={post.user.firstName} src={post.user.profile}>
                              </Avatar>
                            }
                            title={
                              <Link to={`/user/${post.user._id}`} style={{ textDecoration: 'none', color: 'black' }} >
                                {post.user.username}
                              </Link>
                            }
                            subheader={post.body}
                          />
                        </li>
                        <hr />
                        <div style={{ overflow: 'scroll', height: '300px' }}>
                          {post.comments.length ? post.comments.map(comment => (
                            <li key={post._id}>
                              <CardHeader
                                avatar={
                                  <Avatar alt={comment.user.username} src={comment.user.profile}>
                                  </Avatar>
                                }
                                title={`${comment.user.username} ${comment.comment}`}
                              />
                            </li>
                          )) : null}
                        </div>
                        <div>
                          <CardContent>
                            <CardActions disableSpacing>
                              <IconButton aria-label="like" color="default">
                                <FormControlLabel
                                  control={<Checkbox icon={<FavoriteBorder />}
                                    checkedIcon={<Favorite />}
                                    name="checkedH"
                                  />}
                                />
                              </IconButton>
                              <IconButton aria-label="comment">
                                <ChatIcon className={classes.noMargPad} />
                              </IconButton>
                            </CardActions>
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

                            />
                            <Button onClick={handleComment}>Post</Button>
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
                  <DeleteIcon onClick={() => handleDeletePost(post._id)} />
                </Typography>
              </div>
            </GridListTile>
          )) : null
          }
        </GridList>
      </div>
    </>
  )
}

export default ProfilePosts
