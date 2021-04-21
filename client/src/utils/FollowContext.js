import { CallMissedSharp } from '@material-ui/icons'
import { useState } from 'react'
import { User } from '../utils'

// this is a pseudo FAKE Context not a TRUE Context

const FollowContext = () => {

  const [following, setFollowing] = useState({
    users:[]
  })

  // use effect will setFollowing({ users: dataPulled }) from current user's following users id

  const handleFollow = (focusedUser) => {
    let type = 'follow'
    following.users.forEach(followed => {
      if (followed == focusedUser) {
        let type = 'unfollow'
      }
    })
    User.touchPost({
      type,
      follow_user_id: 
    })
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log(err))
  }


  const[followed, setFollowed] = useState(false)


  value={followed ? 'Unfollow' : 'Follow'}
  className={followed ? classes.blend : classes.highlight}
}


