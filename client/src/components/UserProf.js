import { useState, useEffect, React } from 'react'
import { User, Post } from '../utils'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import './ProfPost.css'
import { Typography, Modal, Avatar, CardHeader } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';



const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    marginTop: 100,
  },
  gridList: {
    width: '80%',
  },
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    width: '600px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  image: {
    height: 450,
    width: 300
  }

}))

const UserProf = ({id}) => {
  const classes = useStyles()
  const [postState, setPostState] = useState({
    posts: [],
    username: '',
    profile: ''
  })
  

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
 
    User.getUser(id)
      .then(({ data }) => {

        const posts = data.posts.map(post => ({
        ...post, 
        open: false
      }))
      setPostState({ ...postState, posts, profile: data.profile, username: data.username })

    })
      
    .catch(err => { console.log(err) })

  }, [])

  // const rand = () => {
  //   return Math.round(Math.random() * 20) - 10;
  // }

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
                        {post.comments.length ? post.comments.map(comment => (
                          <li key={post._id} >
                            <CardHeader
                              avatar={
                                <Avatar alt={comment.user.username} src={comment.user.profile}>
                                </Avatar>
                              }
                              title={`${comment.user.username} ${comment.comment}`}

                            />
                          </li>
                        )) : null}
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
          ))
            : null
          }
        </GridList>
      </div>
    </>
  )
}

export default UserProf