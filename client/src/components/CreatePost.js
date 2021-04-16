import { React, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Post from '../utils/Post'

import { storage } from '../utils/firebase'
import Fab from "@material-ui/core/Fab";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import CloseIcon from '@material-ui/icons/Close';
import { Divider } from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 500
  },
  title: {
    fontSize: 14
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  fileInput: {
    display: 'none'
  },
  relative: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative",
    justifyContent: "center"
  },
  absolute: {
    width: "50px",
    height: "50px",
    position: "absolute",
    top: "13px",
    right: 0,
    bottom: '3px',
    left: "13px"
  },
  padding: {
    padding: 0
  },
  toFrame: {
    width: "90%"
  }
})

const CreatePost = () => {
  const classes = useStyles()

  const [display, setDisplay] = useState(false) 
  const [mainState, setState] = useState("initial")
  const [postState, setPostState] = useState({
    body: '',
    image: '',
    posts: []
  })

  const handleInputChange = ({ target }) => {
    setPostState({ ...postState, [target.name]: target.value })
    setDisplay(true)
  }

  const handleCreatePost = event => {
    event.preventDefault()
    Post.create({
      body: postState.body,
      image: postState.image,
    })
      .then(({ data: post }) => {
        console.log(post)
        setPostState({ ...postState, body: '', image: '' })
      })
      .catch(err => console.error(err))
  }

  const handleFileChange = event => {
    event.preventDefault()
    // **** can put conditional on file.size to put a limit on the size of a file
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
            setPostState({ ...postState, image: firebaseUrl })
            setState("uploaded")
            setDisplay(true)
          })
      }
    )
  }

  const cardReset = event => {
    setState("initial")
    setPostState({ ...postState, body: '', image: '' })
    setDisplay(false)
  }

  const renderAddImage = () => {
    return (
      <div>
        <input
          accept="image/*"
          className={classes.fileInput}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="contained-button-file">
          <Fab component="span" className={classes.button}>
            <AddPhotoAlternateIcon />
          </Fab>
        </label>
      </div>
    )
  }

  const renderUploaded = () => {
    return (
      <div>
        <img
          width="100%"
          src={postState.image}
          alt="your image"
        />
      </div>
    )
  }

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardContent className={classes.padding}>
          <form className={classes.flexColumn} noValidate autoComplete="off">
            <div className={classes.relative}>

              <h1>Create A Post</h1>
              {display &&
              <Fab component="span" onClick={cardReset} className={classes.absolute}>
                <CloseIcon />
              </Fab>
              }
            </div>

            {(mainState == "initial" && renderAddImage()) || (mainState == "uploaded" && renderUploaded())}

            <TextField className={classes.toFrame} label="Write a Caption" name="body" onChange={handleInputChange} value={postState.body} />
            <br />
            <Button variant="contained" onClick={handleCreatePost}>Publish</Button>
          </form>
        </CardContent>
      </Card>

    </>

  )
}

export default CreatePost