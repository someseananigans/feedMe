import { useEffect } from 'react'
import { Avatar, CardHeader, Button } from '@material-ui/core';
import { FollowContext } from '../utils'
import { Link } from 'react-router-dom'




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

export default SearchResult
