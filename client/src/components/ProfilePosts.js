import { useState, useEffect, React } from 'react'
import { Post } from '../utils/'
import { makeStyles } from '@material-ui/core/styles'
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import './ProfPost.css'
import { Typography, Modal, } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';



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
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  image: {
    height: 300,
  }
  
}))

const ProfilePosts = () => {
  const classes = useStyles()
  const [postState, setPostState] = useState({
    posts: []
  })

  useEffect(() => {
    Post.getOwned()
    .then(({ data: posts }) => {
    setPostState({ ...postState, posts })
    console.log(posts)
    })
    .catch(err => {console.log(err)})
  
  }, [])

  const handleDeletePost = id => {
    
    Post.delete(id)
    .then(() => {
      window.location = '/profile'
      const posts = [postState.posts]
      setPostState({ ...postState, posts })
      
    })
    .catch(err => console.log(err))
  }
  
  const rand = () => {
    return Math.round(Math.random() * 20) - 10;
  }
  
  const getModalStyle = () => {
    const top = 50 + rand();
    const left = 50 + rand();
    
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(postState)
    return (
      <>
      <div className={classes.root}>
        <GridList cellHeight={160} className={classes.gridList} cols={5}>
          { postState.posts.length ? postState.posts.map((post, index) => (
            
            <GridListTile key={post._id} cols={1} className={classes.image}  onClick={handleOpen}  >
              <img src={post.image} alt={post.body}/>
              <div>
              <Modal
                open={open}
                onClose={handleClose}
                onBackdropClick={handleClose}
                >
                  <div style={modalStyle} className={classes.paper}>
                    <img src={post.image} alt={post.body} className={classes.image} />
                    <Typography>{post.comments}</Typography>
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
