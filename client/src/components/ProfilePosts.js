import { useState, useEffect, React } from 'react'
import Post from '../utils/Post.js'
import { makeStyles } from '@material-ui/core/styles'
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import './ProfPost.css'
import { Typography, Modal } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    marginTop: 20,
  },
  gridList: {
    width: '80%',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

}))

const ProfilePosts = () => {
 const classes = useStyles()
  const [postState, setPostState] = useState({
    posts: []
  })

  useEffect(() => {
    Post.getOwned()
    .then(({ data: posts }) => {
      setPostState ({ ...postState, posts })
    })
    .catch(err => {console.log(err)})

  }, [])

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <h2 id="modalTitle"> </h2>
      <p id="modalDesc">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </div>
  );
 
    
    return (
      <>
    
      <div className={classes.root}>
        <GridList cellHeight={160} className={classes.gridList} cols={5}>
          {postState.posts.length ? postState.posts.map(post => (
            <GridListTile key={post._id} cols={1} className={classes.image}>
              <img src={post.image} alt={post.caption} className='image' onClick={handleOpen}/>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby={post.body}
                aria-describedby="modalDesc"
              >
                {body}
              </Modal>
              <div className='overlay'>
                <Typography>
                {post.body}
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

export default ProfilePosts
