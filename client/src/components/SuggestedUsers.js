import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, CardHeader, Button } from '@material-ui/core';
import { FollowContext } from '../utils'

const SuggestedUsers = (props) => {
  const {
    user_id,
    username,
    profile,
    firstName,
    classes,
  } = props

  const {
    handleFollow, // follow or unfollow
    followAction, // follow or following (updated by followCheck) 
    followCheck, // within Suggested Users, checks to see if user has followed
  } = FollowContext()

  useEffect(() => {
    followCheck(user_id)
  }, [])

  return (
    <>
      <CardHeader key={user_id} className={classes.suggestions}
        avatar={
          <Link to={`/user/${user_id}`} style={{ textDecoration: 'none', color: 'black' }} >
            <Avatar alt={firstName} src={profile} className={classes.avatar}>
            </Avatar>
          </Link>

        }
        title={
          <Link to={`/user/${user_id}`} style={{ textDecoration: 'none', color: 'black' }} >
            {username}
          </Link>
        }
        action={
          <Button
            className={followAction == 'follow' ? classes.follow : classes.following}
            onClick={(() => handleFollow(user_id))}
          >
            {followAction}
          </Button>
        }
        classes={{ action: classes.buttonParent }}
      />
    </>
  )
}

export default SuggestedUsers
