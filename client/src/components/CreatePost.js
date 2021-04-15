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




const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 500,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  input: {
    display: 'none'
  }
})

const CreatePost = () => {

  const classes = useStyles()
  const [postState, setPostState] = useState({
    body: '',
    image: '',
    posts: []
  })

  const handleInputChange = ({ target }) => {
    setPostState({ ...postState, [target.name]: target.value })
  }

  // firebase integration needed for getting image url and setting img within the state

  const handleCreatePost = event => {
    event.preventDefault()
    Post.create({
      body: postState.body,
      image: postState.image,
    })
      .then(({ data: post }) => {
        console.log(post)
        const posts = [...postState.posts]
        posts.push(post)
        setPostState({ ...postState, posts, body: '', image: '' })
      })
      .catch(err => console.error(err))
  }

  // const [image, setImage] = useState(null)
  const handleFileChange = event => {
    event.preventDefault()
    // **** can put conditional on file.size to put a limit on the size of a file
    const file = event.target.files[0]
    const imgName = "Gram" + Date.now()
    // imgName is the image ref inside the storage ref and you are putting the image file grabbed from the "image" state
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
          })
      }
    )
    console.log(file)
  }


  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <form className={classes.flexColumn} noValidate autoComplete="off">
          <h1>Create A Post</h1>
            <input
              accept="image/*"
              className={classes.input}
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
            <TextField label="Write a Caption" name="body" onChange={handleInputChange} />
            <br />
            <Button variant="contained" onClick={handleCreatePost}>Publish</Button>
          </form>
        </CardContent>
      </Card>

    </>

  )
}

export default CreatePost