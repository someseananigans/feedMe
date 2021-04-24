import { React, useState } from 'react';
import { Post } from '../utils'
import { storage } from '../utils/firebase'
import { Card, CardContent, Button, TextField, DialogTitle, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { AddPhotoAlternate as AddPhoto, Close as CloseIcon } from '@material-ui/icons'

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
    top: "7px",
    right: 0,
    bottom: '7px',
    left: "13px"
  },
  padding: {
    padding: 0
  },
  toFrame: {
    width: "90%"
  }
})

const CreatePost = (props) => {
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
        window.location.reload()
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
            <AddPhoto />
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
          alt={postState.body}
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
              <DialogTitle id="scroll-dialog-title">Create a Post</DialogTitle>
              {display &&
                <Fab component="span" onClick={cardReset} className={classes.absolute}>
                  <CloseIcon />
                </Fab>
              }
            </div>

            {(mainState === "initial" && renderAddImage()) || (mainState === "uploaded" && renderUploaded())}

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