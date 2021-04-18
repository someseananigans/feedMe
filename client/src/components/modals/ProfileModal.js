import { useState } from 'react'
import EditProfile from '../EditProfile'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';


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
}));


const ProfileModal = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen(!open)
  }

  const [modalStyle] = useState(getModalStyle);


  return (
    <div>
      <button type="button" onClick={toggleOpen} >
        Open Modal
      </button>
      <Modal
        open={open}
        onClose={toggleOpen}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
      >
        <div style={modalStyle} className={classes.paper}>

          <EditProfile />

        </div>
      </Modal>


    </div>
  )
}

export default ProfileModal
