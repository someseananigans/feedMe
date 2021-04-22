import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, CardHeader, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { User, FollowContext } from '../utils'
import SuggestedUsers from './SuggestedUsers'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: 0,
      width: 320,
      height: 400,
      overflowY: 'auto',
      boxShadow: 'none',
      backgroundColor: 'transparent'
    },
  },
  suggestBox: {
    marginLeft: 20,
    color: 'gray',
  },
  suggestions: {
    paddingRight: 0
  },
  follow: {
    fontSize: 13,
    color: 'blue'
  },
  following: {
    fontSize: 13,
    color: 'black'
  },
  buttonParent: {
    margin: 0
  },
  avatar: {
    height: '32px',
    width: '32px',
  },
  bigAvatar: {
    height: '55px',
    width: '55px',
  },
  username: {
    textDecoration: 'none',
    color: 'black',
    fontWeight: 500
  },
  name: {
    margin: 0
  }
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
            setCurrentUserState({ ...currentUserState, user })
            let filteredUsers = []
            for (let i = 0; i < users.length; i++) {
              if (users[i]._id !== user._id) {
                filteredUsers.push(users[i])
              }
            }
            // console.log(filteredUsers)
            setUserState({ ...userState, users: filteredUsers })
          })
      })
  }, [])
      
  return (
    <div className={classes.root}>
      <Paper>
        <CardHeader
          avatar={
            <Link to="/profile" >
              <Avatar alt={currentUserState.user.username} src={currentUserState.user.profile} className={classes.bigAvatar}>
                </Avatar>
            </Link>
          }
          title={
            <>
            <Link to="/profile" className={classes.username} >
              {currentUserState.user.username}
            </Link>
            <p className={classes.name}>{currentUserState.user.name}</p>
            </>
          }
        />
        <Typography className={classes.suggestBox}>Suggestions for you</Typography>
        {userState.users.length ? userState.users.map(user =>
          <SuggestedUsers
            user_id={user._id}
            username={user.username}
            profile={user.profile}
            firstName={user.firstName}
            classes={classes}
            usersfollowing={currentUserState.user.following}
          />

        ) : null
        }
      </Paper>
    </div>
  );

}

export default Suggested
