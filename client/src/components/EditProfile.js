import { React, useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, Fab } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { storage } from '../utils/firebase'
import User from '../utils/User'


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
  centerContent: {
    justifyContent: "center",
    display: "flex",
    alignSelf: "center"
  },
  inputMargin: {
    marginBottom: "5px",
    marginTop: "5px",
  },
  column: {
    display: "flex",
    flexDirection: "column"
  },
  fileInput: {
    display: "none"
  }
}));




const EditProfile = () => {
  const classes = useStyles()

  const [userInfo, setUserInfo] = useState({
    profile: '',
    name: '',
    email: ''
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
    console.log('hi')
    User.edit({
      profile: userInfo.profile,
      name: userInfo.name,
      email: userInfo.email,
      username: userInfo.username,
    })
      .then(() => console.log('updated'))
      .catch(err => console.log(err))
  }



  return (
    <>
      <Grid container>
        <Grid xs={4} className={classes.centerContent}>
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

        </Grid>

        <Grid xs={8} className={classes.centerContent}>
          <Grid container className={classes.column}>
            <TextField name="name" typee="text" label="Name" variant="outlined" value={userInfo.name} className={classes.inputMargin} onChange={handleInputChange} />
            <TextField name="email" typee="email" label="Email" variant="outlined" value={userInfo.email} className={classes.inputMargin} onChange={handleInputChange} />
            <TextField name="username" typee="username" label="Username" variant="outlined" value={userInfo.username} className={classes.inputMargin} onChange={handleInputChange} />
            <Button onClick={handleSave} className={classes.inputMargin} >Save</Button>
          </Grid>
        </Grid>

      </Grid>




    </>
  )
}

export default EditProfile
