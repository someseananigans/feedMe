import { useState, useRef, useEffect } from 'react'
import { Dialog, Typography, IconButton, Badge, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CreatePost from '../CreatePost'
import EditProfile from '../EditProfile'
import ViewMore from '../grams/ViewMore'
import { Add as AddIcon, ChatBubbleOutline as ChatIcon, Delete as DeleteIcon } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: ".8rem",
    lineHeight: 1,
    padding: "6px 9px",
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  gramModal: {
    // minWidth: '90%',
    // maxWidth: '90%'
  }
}));

const PostModal = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open)
  }

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      {props.comp === "createPostText" &&
        (<>
          <IconButton aria-label="" color="inherit" onClick={toggleOpen}>
            <Badge badgeContent={0} color="secondary">
              <AddIcon />
            </Badge>
          </IconButton>
          <p onClick={toggleOpen}>Create a Post</p>
        </>)}
      {props.comp === "createPost" &&
        (<IconButton aria-label="" color="inherit" onClick={toggleOpen}>
          <Badge badgeContent={0} color="secondary">
            <AddIcon />
          </Badge>
        </IconButton>)}
      {props.comp === "ViewMore" &&
        (<IconButton aria-label="comment" onClick={toggleOpen}>
          <ChatIcon className={props.classes.noMargPad} />
        </IconButton>)}
      {props.comp === "ViewMore2" &&
        (<span onClick={toggleOpen}>{props.commentList.length > 1 ? `View all ${props.commentList.length} comments` : null}</span>)}
      {props.comp === "ViewMoreProfile" &&
        (<div className='overlay' onClick={toggleOpen}>
          <Typography>
            {props.caption}
            {props.currentUser.user._id === props.userId ? (

              <DeleteIcon onClick={() => props.handleDeletePost(props.postId)} />
            ) : null}
          </Typography>
        </div>)}
      {props.comp === "EditProfile" &&
        (<Button variant="contained" className={classes.button} type="button" onClick={toggleOpen} >
          Edit Profile
        </Button>)}
      <Dialog
        className={classes.gramModal}
        open={open}
        onClose={toggleOpen}
        scroll="body"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >

        {props.comp === "createPost" && <CreatePost />}
        {props.comp === "createPostText" && <CreatePost />}
        {props.comp === "ViewMore" && <ViewMore props={props} />}
        {props.comp === "ViewMore2" && <ViewMore props={props} />}
        {props.comp === "ViewMoreProfile" && <ViewMore props={props} />}
        {props.comp === "EditProfile" && <EditProfile toggleOpen={toggleOpen} />}

      </Dialog>
    </>
  );
}

export default PostModal