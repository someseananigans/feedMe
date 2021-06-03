import { useState, useEffect } from 'react'
import { Typography, Paper, Avatar, CardHeader, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { User, FollowContext } from '../utils'
import { useHistory } from 'react-router-dom'



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
  },
  userItem: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#e8eef0',
    },
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

  const history = useHistory()


  useEffect(() => {
    followCheck(usersFollowing, user._id)
  }, [usersFollowing])

  const handleFollowClick = (event) => {
    handleFollow(user._id)
    event.stopPropagation()
  }

  return (
    <>
      <CardHeader
        key={user._id}
        className={classes.userItem}
        onClick={(() => history.push(`/${user._id}`))}
        avatar={
          <Avatar alt={user.firstName} src={user.profile}>
          </Avatar>
        }
        title={user.username}
        action={
          <Button
            className={followAction === 'follow' ? classes.follow : classes.following}
            onClick={((event) => handleFollowClick(event))}
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
          <hr style={{ marginBottom: 0 }} />
          {users.length > 0 ? users.map(user => (
            currentUser.userId !== user._id && (
              <SearchResult
                usersFollowing={currentUser.following}
                user={user}
                classes={classes}
                className={classes.followBtn}
              />
            )
          )) : (<p style={{ marginLeft: '20px' }}>No matching user detected</p>)
          }
        </Paper>
      </div>

    </>

  )
}

export default Search