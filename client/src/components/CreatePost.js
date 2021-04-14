import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


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
  // uploadBtn: {
  //   border: 
  // }
})

const useStyles1 = makeStyles((theme) => ({
  root1: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));



const CreatePost = () => {
  const classes = useStyles()
  const classes1 = useStyles1()
  // const handleCreatePost = () => {
  //   const [postState, setPostState] = useState({
  //     title: '',
  //     body: '',
  //     posts: []
  //   })
  // }
  // const handleInputChange = ({ target }) => {
  //   setPostState({ ...postState, [target.name]: target.value })
  // }

  return (
      <>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <h1>Create A Post</h1>
          <input
            accept="image/*"
            className={classes.input}
            id="raised-button-file"
            multiple
            type="file"
          />
          <label htmlFor="raised-button-file">
          </label>
          <form className={classes.root1} noValidate autoComplete="off"></form>
          <TextField id="standard-basic" label="Caption" />
          <br/>
          <Button variant="contained">Post</Button>
        </CardContent>
      </Card>

      </>

  )
}

export default CreatePost 