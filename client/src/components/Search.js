import { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import { Avatar, CardHeader, Typography, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import  User from '../utils/User'


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: 400,
        // height: 400,
        // overflow: 'scroll'
      },
    },
    suggestions: {
      marginLeft: 20,
      color: 'gray',
      
    },
    follow: {
      fontSize: 13,
      color: 'blue',
    },
  }));


const Search = (props) => {


  const classes = useStyles();
  const [users, setUsers] = useState([])

  useEffect(() => {
    User.search(props.searchQuery)
      .then(({ data }) => {
        setUsers(data)
      })
      .catch(err => console.log(err))
    console.log(props)
  }, [])


  return (
    <>
      <div className={classes.root}>
      <Paper>
        <Typography className={classes.suggestions}>Search Results</Typography>
          {users.length > 0 && users.map(user => (
            <CardHeader
              key={user._id}
              avatar={
              <Avatar alt={user.firstName} src={user.profile}>
            </Avatar>
              } 
              title={
              <Link to={`/user/${user._id}`} style={{ textDecoration: 'none', color: 'black' }} >
                {user.username}
              </Link>
              }
          action={
            <IconButton className={classes.follow}>
              Follow
            </IconButton>
                }
            />
          ))
        }
      </Paper>
    </div>

    </>

  )
}

export default Search