import { useState } from 'react'
import EditProfile from '../EditProfile'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: "80%",
  },
  button: {
    fontSize: ".8rem",
    lineHeight: 1,
    padding: "6px 9px",
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  }
}));


const ProfileModal = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen(!open)
  }

  const [modalStyle] = useState(getModalStyle);


  return (
    <>
      <Button variant="contained" className={classes.button} type="button" onClick={toggleOpen} >
        Edit Profile
      </Button>
      <Modal
        open={open}
        onClose={toggleOpen}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div style={modalStyle} className={classes.paper}>
          <EditProfile toggleOpen={toggleOpen}/>
        </div>
      </Modal>


    </>
  )
}

export default ProfileModal
