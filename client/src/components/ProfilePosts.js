import { useState, useEffect, React } from 'react'
import { Post, User, Comment as Cmnt } from '../utils/'
import { makeStyles } from '@material-ui/core/styles'
import './ProfPost.css'
import { Grid } from '@material-ui/core'
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

  const [update, setUpdate] = useState('')


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

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirm, setConfirm] = useState(false)

  const toggleDeleteDialog = () => {
    setConfirmOpen(!confirmOpen)
  }

  const handleConfirm = (response, id) => {
    switch (response) {
      case 'No':
        toggleDeleteDialog()
        break;
      case 'Yes':
        handleDeletePost(id)
        toggleDeleteDialog()
        break;
    }
  }

  const handleDeletePost = id => {
    Post.delete(id)
      .then(() => {
        setUpdate('delete update')
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
  }, [update])


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
            <Grid item key={post._id} className={classes.gridItem} >
              <img src={post.image} alt={post.body} className={classes.imageHome} />

              <Modal
                classes={classes}
                open={post.open}
                comp="ViewMoreProfile"
                handleLike={(() => handleLike(post._id))}
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
                likeCheck={likeCheck}
                setLikeCount={setLikeCount}
                postLikedBy={post.liked_by}
                toggleDeleteDialog={toggleDeleteDialog}
                confirmOpen={confirmOpen}
                handleConfirm={handleConfirm}
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