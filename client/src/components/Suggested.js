import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, CardHeader, Typography, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { User, FollowContext } from '../utils'

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
    paddingRight: 0,
    paddingBottom: 0,
    paddingTop: '8px'
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
    fontWeight: 500,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  name: {
    margin: 0
  },
}));

const SuggestedUsers = (props) => {
  const {
    user_id,
    username,
    profile,
    firstName,
    usersfollowing,
    classes
  } = props

  const {
    handleFollow, // follow or unfollow
    followAction, // follow or following (updated by followCheck) 
    followCheck, // within Suggested Users, checks to see if user has followed
  } = FollowContext()

  useEffect(() => {
    followCheck(usersfollowing, user_id)
  }, [])

  return (
    <CardHeader className={classes.suggestions}
      avatar={
        <Link to={`/${user_id}`} >
          <Avatar alt={firstName} src={profile} className={classes.avatar}>
          </Avatar>
        </Link>

      }
      title={
        <Link to={`/${user_id}`} className={classes.username} >
          {username}
        </Link>
      }
      action={
        <Button
          className={followAction === 'follow' ? classes.follow : classes.following}
          onClick={(() => handleFollow(user_id))}>
          {followAction}
        </Button>
      }
      classes={{ action: classes.buttonParent }}
    />
  )
}

const Suggested = () => {
  const classes = useStyles();
  const [userState, setUser] = useState({
    users: []
  })

  const [currentUser, setCurrentUser] = useState({
    user: {}
  })

  useEffect(() => {

    User.getNUsers(6)
      .then(({ data: users }) => {

        User.profile()
          .then(({ data: user }) => {
            setCurrentUser({ ...currentUser, user })
            let filteredUsers = []
            for (let i = 0; i < users.length; i++) {
              if (users[i]._id !== user._id) {
                filteredUsers.push(users[i])
              }
            }
            setUser({ ...userState, users: filteredUsers })
          })
      })
  }, [])

  return (
    <div className={classes.root}>
      <Paper>
        <CardHeader
          avatar={
            <Link to="/profile" >
              <Avatar alt={currentUser.user.username} src={currentUser.user.profile} className={classes.bigAvatar}>
              </Avatar>
            </Link>
          }
          title={
            <>
              <Link to="/profile" className={classes.username} >
                {currentUser.user.username}
              </Link>
              <p className={classes.name}>{currentUser.user.name}</p>
            </>
          }
        />
        <Typography className={classes.suggestBox}>Suggestions for you</Typography>
        {userState.users.length ? userState.users.map(user =>
          <SuggestedUsers
            key={user.username}
            user_id={user._id}
            username={user.username}
            profile={user.profile}
            firstName={user.firstName}
            classes={classes}
            usersfollowing={currentUser.user.following}
          />

        ) : null
        }
      </Paper>
    </div>
  );

}

export default Suggested
