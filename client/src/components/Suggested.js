import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Avatar, CardHeader, Typography, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom'

import User from '../utils/User.js'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: 300,
      height: 400,
    },
  },
  suggestions: {
    marginLeft: 20,
    color: 'gray'
  },
  follow: {
    fontSize: 13,
    color: 'blue',
  },
}));

const Suggested = () => {
  const classes = useStyles();
  const [userState, setUserState] = useState({
    users: []
  })
  const [currentUserState, setCurrentUserState] = useState({
    user: {}
  })

 
  useEffect(() => {

    User.getUsers()
    .then(({ data: users }) => {
        User.profile()
          .then(({ data: user }) => { 
            let filteredUsers = []
            for (let i = 0; i < users.length; i++) {
              if (users[i]._id !== user._id) {
                filteredUsers.push(users[i])
              }
              console.log(users[i])
            }
            console.log(filteredUsers)
            setUserState ({ ...userState, users: filteredUsers})
            setCurrentUserState ({ ...currentUserState, user })

          })
        
      })
      
  }, [])
      
  return (
    <div className={classes.root}>
      <Paper>
        <CardHeader
          avatar={
            <Avatar alt={currentUserState.user.username} src={currentUserState.user.profile}>
            </Avatar>
          }
          title={
            <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }} >
            {currentUserState.user.username}
            </Link>
          }
        />
        <Typography className={classes.suggestions}>Suggestions for you</Typography>
          {userState.users.length ? userState.users.map(user => (

            <CardHeader
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
          )) : null
        }
      </Paper>
    </div>
  );

}

export default Suggested
