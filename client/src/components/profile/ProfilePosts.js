import { useState, useEffect, React } from 'react'
import { Post, FollowContext } from '../../utils/'
import { makeStyles } from '@material-ui/core/styles'
import './ProfPost.css'
import { Grid, Box, Paper, Tabs, Tab } from '@material-ui/core'
import human from 'human-time'
import { Modal } from '../'




const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: '#fafafa',
    marginTop: 30,
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
    height: '250px',
    width: '250px',
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
    height: '100%',
    width: '100%',
    position: 'relative',
    objectFit: 'cover',
    backgroundColor: '#ececec',
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

const ProfilePosts = ({ id, currentUser, user }) => {

  const classes = useStyles()

  const {
    comment,
    handleComment, handleCommentInput,
    cmntList, setCmntList,
    likeCheck, likeAction,
    likeCount, setLikeCount, handleLike,
    update, setUpdate
  } = FollowContext()

  const [postState, setPostState] = useState({
    posts: [],
    username: '',
    profile: '',
  })


  const [confirmOpen, setConfirmOpen] = useState(false)

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
      default:
        break;
    }
  }

  const handleDeletePost = (id) => {
    Post.delete(id)
      .then(() => {
        setUpdate('delete update')
        const posts = [postState.posts]
        setPostState({ ...postState, posts })

      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    const posts = user.posts.map(post => ({
      ...post,
      open: false
    }))
    posts.reverse()
    setPostState({ ...postState, posts, profile: user.profile, username: user.username })

  }, [update, user])


  const [renderFocus, setRenderFocus] = useState('posts')
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setRenderFocus(event.target.innerHTML)
  };



  return (

    <div className={classes.root}>
      <Box xs={12} xl={12} lg={12} md={12} style={{ maxWidth: '830px', width: '90%' }}>
        <Paper style={{ margin: '20px 0', boxShadow: 'none', }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant='fullWidth'
          >
            <Tab style={{ background: '#fafafa' }} label='posts'></Tab>
            <Tab style={{ background: '#fafafa' }} label='liked'></Tab>
          </Tabs>
        </Paper>
      </Box>

      {renderFocus === 'posts' &&
        <Grid container cellHeight={300} className={classes.gridList}>
          {postState.posts.length > 0 && postState.posts.map(post => (
            <Grid item key={post._id} className={classes.gridItem} >
              <img src={post.image} alt={post.body} className={classes.imageHome} />

              <Modal
                classes={classes}
                open={post.open}
                comp="ViewMoreProfile"
                usernameLink={currentUser._id === post.user ? ('/profile') : (`/${post.user}`)}
                profile={postState.profile}
                username={postState.username}
                postId={post._id}

                timePassed={(human((Date.now() - post.created_On) / 1000))}
                currentUser={currentUser}
                handleDeletePost={handleDeletePost}
                toggleDeleteDialog={toggleDeleteDialog}
                confirmOpen={confirmOpen}
                handleConfirm={handleConfirm}

                handleLike={handleLike}
                setLikeCount={setLikeCount}
                likeAction={likeAction}
                likeCheck={likeCheck}
                likeDisplay={likeCount !== 1 ? `${likeCount} likes` : '1 like'}

                handleComment={handleComment}
                cmntList={cmntList}
                setCmntList={setCmntList}
                handleCommentInput={handleCommentInput}
                comment={comment}
                currentUser={currentUser}
                update={update}
                setUpdate={setUpdate}
              />
            </Grid>
          ))}
        </Grid>
      }

      {/* !!!!!!!!! Needs liked post state */}

      {renderFocus === 'liked' &&
        <Grid container cellHeight={300} className={classes.gridList}>
          {postState.posts.length > 0 && postState.posts.map(post => (
            <Grid item key={post._id} className={classes.gridItem} >
              <img src={post.image} alt={post.body} className={classes.imageHome} />

              <Modal
                classes={classes}
                open={post.open}
                comp="ViewMoreProfile"
                usernameLink={currentUser._id === post.user ? ('/profile') : (`/${post.user}`)}
                profile={postState.profile}
                username={postState.username}
                postId={post._id}

                timePassed={(human((Date.now() - post.created_On) / 1000))}
                currentUser={currentUser}
                handleDeletePost={handleDeletePost}
                toggleDeleteDialog={toggleDeleteDialog}
                confirmOpen={confirmOpen}
                handleConfirm={handleConfirm}

                handleLike={handleLike}
                setLikeCount={setLikeCount}
                likeAction={likeAction}
                likeCheck={likeCheck}
                likeDisplay={likeCount !== 1 ? `${likeCount} likes` : '1 like'}

                handleComment={handleComment}
                cmntList={cmntList}
                setCmntList={setCmntList}
                handleCommentInput={handleCommentInput}
                comment={comment}
                currentUser={currentUser}
                update={update}
                setUpdate={setUpdate}
              />
            </Grid>
          ))}
        </Grid>}

    </div>

  )
}

export default ProfilePosts