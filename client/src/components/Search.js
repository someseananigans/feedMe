import { useState, useEffect } from 'react'
import { Typography, Paper, Avatar, CardHeader, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { User } from '../utils'
// import SearchResult from './SearchResult'
import { FollowContext } from '../utils'
import { Link } from 'react-router-dom'



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
    justifyContent: 'center'
  },
  suggestions: {
    marginLeft: 20,
    color: 'gray',
    paddingTop: 10,
  },
  follow: {
    fontSize: 13,
    color: 'blue'
  },
  following: {
    fontSize: 13,
    color: 'black'
  },
  followBtn: {
    display: 'flex',
    alignItems: 'center'
  }
}));


const SearchResult = (props) => {

  const {
    usersFollowing,
    user,
    classes
  } = props

  const {
    handleFollow, // follow or unfollow
    followAction, // follow or following (updated by followCheck) 
    followCheck, // within Suggested Users, checks to see if user has followed
  } = FollowContext()

  useEffect(() => {
    followCheck(usersFollowing, user._id)
  }, [usersFollowing])

  return (
    <>
      <CardHeader
        key={user._id}
        avatar={
          <Avatar alt={user.firstName} src={user.profile}>
          </Avatar>
        }
        title={
          <Link to={`/${user._id}`} style={{ textDecoration: 'none', color: 'black' }} >
            {user.username}
          </Link>
        }
        action={
          <Button
            className={followAction === 'follow' ? classes.follow : classes.following}
            onClick={(() => handleFollow(user._id))}
            style={{ marginTop: 10 }}
          >
            {followAction}
          </Button>
        }
      />
    </>
  )
}

const Search = ({ searchQuery }) => {
  const classes = useStyles();

  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({
    userId: '',
    following: []
  })

  useEffect(() => {
    User.search(searchQuery)
      .then(({ data }) => {
        setUsers(data)
      })
      .catch(err => console.log(err))
    User.profile()
      .then(({ data: user }) => setCurrentUser({
        userId: user._id,
        following: user.following
      }))
      .catch(err => console.log(err))
  }, [searchQuery])


  return (
    <>
      <div className={classes.root}>
        <Paper>
          <Typography className={classes.suggestions}>Search Results</Typography>
          <hr />
          {users.length > 0 ? users.map(user => (
            currentUser.userId !== user._id ? (
              <SearchResult
                usersFollowing={currentUser.following}
                user={user}
                classes={classes}
                className={classes.followBtn}
              />
            ) : (<p style={{ marginLeft: '20px' }}>No matching user detected</p>)
          )) : (<p style={{ marginLeft: '20px' }}>No matching user detected</p>)
          }
        </Paper>
      </div>

    </>

  )
}

export default Search