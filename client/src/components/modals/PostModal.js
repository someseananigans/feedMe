import { useState, useRef, useEffect } from 'react'
import { Dialog, Fab } from '@material-ui/core'
import CreatePost from '../CreatePost'
import { Add as AddIcon } from '@material-ui/icons'

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
      <Fab size="small" color="secondary" aria-label="add" >
        <AddIcon onClick={handleClickOpen} />
      </Fab>
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