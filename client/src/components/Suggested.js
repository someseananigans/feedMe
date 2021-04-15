import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Avatar, CardHeader, Typography, IconButton } from '@material-ui/core';
import Users from '../utils/User.js'
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
    Users.getUsers()
      .then(({ data: users }) => {
        setUserState({ ...userState, users })
      })
      
    User.profile()
      .then(({ data: user }) => {
        setCurrentUserState({ ...currentUserState, user})
      })
  }, [])
      
  return (
    <div className={classes.root}>
      <Paper>
        <CardHeader
          avatar={
            <Avatar alt={currentUserState.user.username} src={currentUserState.user.image}>
            </Avatar>
          }
          title={currentUserState.user.username}
        />
        <Typography className={classes.suggestions}>Suggestions for you</Typography>
          {userState.users.length ? userState.users.map(user => (

            <CardHeader
              avatar={
              <Avatar alt={user.firstName} src={user.image}>
            </Avatar>
              } 
          title={user.username}
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
