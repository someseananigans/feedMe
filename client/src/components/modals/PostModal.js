import { useState, useRef, useEffect } from 'react'
import { Dialog, IconButton, Badge } from '@material-ui/core'
import CreatePost from '../CreatePost'
import { Add as AddIcon} from '@material-ui/icons'

const PostModal = () => {
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
      <IconButton aria-label="" color="inherit" onClick={handleClickOpen}>
        <Badge badgeContent={0} color="secondary">
          <AddIcon />
        </Badge>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="body"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <CreatePost />
      </Dialog>
    </div>
  );
}

export default PostModal