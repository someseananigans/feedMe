import { React, useState, useEffect } from 'react';
import { User } from '../../utils'
import { storage } from '../../utils/firebase'
import { Button, Grid, Fab, Card, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  circle: {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  imageParent: {
    position: "relative",
    display: "flex"
  },
  addImage: {
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "40px",
    height: "40px"
  },
  left: {
    justifyContent: "center",
    display: "flex",
    alignSelf: "center",

  },
  right: {
    justifyContent: "center",
    display: "flex",
    alignSelf: "center",
    width: '90%'

  },
  inputMargin: {
    marginBottom: "8px",
    marginTop: "8px",
  },
  column: {
    display: "flex",
    flexDirection: "column"
  },
  fileInput: {
    display: "none"
  },
  classes: {
    background: "white",
  },
  container: {
    padding: "25px",
    display: 'flex',
    flexDirection: 'column',
    width: '430px',
    [theme.breakpoints.down('xs')]: {
      width: '300px'
    }
  }
}));




const EditProfile = ({ toggleOpen, props }) => {
  const classes = useStyles()

  const [userInfo, setUserInfo] = useState({
    profile: '',
    name: '',
    username: '',
    email: '',
    bio: ''
  })


  const handleInputChange = ({ target }) => {
    setUserInfo({ ...userInfo, [target.name]: target.value })
    console.log(userInfo)
  }

  const handleUpload = event => {
    const file = event.target.files[0]
    const imgName = "Gram" + Date.now()
    const uploadTask = storage.ref(`images/${imgName}`).put(file)
    uploadTask.on(
      "state_changed",
      snapshot => { },
      err => { console.log(err) },
      () => {
        storage
          .ref("images")
          .child(imgName)
          .getDownloadURL()
          .then(firebaseUrl => {
            setUserInfo({ ...userInfo, profile: firebaseUrl })
          })
      }
    )
  }

  const handleSave = () => {
    User.edit({
      profile: userInfo.profile,
      name: userInfo.name,
      email: userInfo.email,
      username: userInfo.username,
      bio: userInfo.bio
    })
      .then(() => {
        console.log('updated')
        props.setUpdate('needs update')
        toggleOpen()
        // window.location.reload()
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    User.profile()
      .then(({ data: user }) => {
        setUserInfo({
          ...userInfo,
          profile: user.profile,
          name: user.name,
          username: user.username,
          email: user.email,
          bio: user.bio
        })
      })
  }, [])

  return (
    <>
      <Card variant="outlined" className={classes.background}>
        <Grid container className={classes.container}>
          <div className={classes.left}>
            <div className={classes.imageParent}>
              <img src={userInfo.profile} alt="profile_photo" className={classes.circle} />

              <input
                accept="image/*"
                className={classes.fileInput}
                id="uploadNewImage"
                multiple
                type="file"
                onChange={handleUpload}
              />
              <label htmlFor="uploadNewImage">
                <Fab component="span" className={classes.addImage}>
                  <AddIcon />
                </Fab>
              </label>
            </div>
          </div>

          <div className={classes.right}>
            <Grid container className={classes.column}>
              <TextField name="name" type="text" label="Name" variant="outlined" value={userInfo.name} className={classes.inputMargin} onChange={handleInputChange} />
              <TextField name="email" type="email" label="Email" variant="outlined" value={userInfo.email} className={classes.inputMargin} onChange={handleInputChange} />
              <TextField name="username" type="username" label="Username" variant="outlined" value={userInfo.username} className={classes.inputMargin} onChange={handleInputChange} />
              <TextField name="bio" type="text" label="bio" variant="outlined" value={userInfo.bio} className={classes.inputMargin} onChange={handleInputChange} />
              <Button onClick={handleSave} className={classes.inputMargin} >Save</Button>
            </Grid>
          </div>
        </Grid>
      </Card>
    </>
  )
}

export default EditProfile
