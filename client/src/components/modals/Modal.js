import { useState, useRef, useEffect } from 'react'
import { Dialog, IconButton, Badge } from '@material-ui/core'
import CreatePost from '../CreatePost'
import ViewMore from '../grams/ViewMore'
import { Add as AddIcon, ChatBubbleOutline as ChatIcon } from '@material-ui/icons'

const PostModal = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    <div>
      {props.comp == "createPost" ?
        (<IconButton aria-label="" color="inherit" onClick={handleClickOpen}>
          <Badge badgeContent={0} color="secondary">
            <AddIcon />
          </Badge>
        </IconButton>) :
        (<IconButton aria-label="comment" onClick={handleClickOpen}>
          <ChatIcon className={props.classes.noMargPad} />
        </IconButton>)
      }
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="body"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >

        {props.comp == "createPost" ? <CreatePost /> : <ViewMore props={props} />}

      </Dialog>
    </div>
  );
}

export default PostModal