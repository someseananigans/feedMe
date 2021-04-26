import { useState, useEffect } from 'react'
import { Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { User } from '../utils'
import SearchResult from './SearchResult'


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


const Search = (props) => {
  const classes = useStyles();

  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({
    userId: '',
    following: []
  })

  useEffect(() => {
    User.search(props.searchQuery)
      .then(({ data }) => {
        setUsers(data)
      })
      .catch(err => console.log(err))
    console.log(props)
    User.profile()
      .then(({ data: user }) => setCurrentUser({
        userId: user._id,
        following: user.following
      }))
      .catch(err => console.log(err))
  }, [])


  return (
    <>
      <div className={classes.root}>
        <Paper>
          <Typography className={classes.suggestions}>Search Results</Typography>
          <hr />
          {users.length > 0 && users.map(user => (
            currentUser.userId !== user._id && (
              <SearchResult
                usersFollowing={currentUser.following}
                user={user}
                classes={classes}
                className={classes.followBtn}
              />
            )
          ))
          }
        </Paper>
      </div>

    </>

  )
}

export default Search