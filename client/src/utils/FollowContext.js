import { useState } from 'react'
import { User } from '../utils'

// this is a pseudo FAKE Context not a TRUE Context

const FollowContext = () => {

  const [following, setFollowing] = useState({
    users:[]
  })

  const[followAction, setFollowAction] = useState('follow')
  
  // use effect will setFollowing({ users: dataPulled }) the current user's following users id
  const setFollowersOnLoad = (usersFollow) => {
    setFollowing({users: usersFollow})
  }

  const handleFollow = (focusedUser) => {
    User.touchUser({
      type: followAction,
      follow_user_id: focusedUser
    })
      .then(data => {
        console.log(data)
        setFollowAction(followAction === 'follow' ? 'following' : 'follow')
      })
      .catch(err => console.log(err))
  }



  const followCheck = (focusedUser) => {
    setFollowAction(following.users.indexOf(focusedUser) !== -1 ? 'following' : 'follow')
  }

  return {
    following,
    setFollowing,
    handleFollow,
    followAction,
    setFollowAction, 
    followCheck,
    setFollowersOnLoad
  }
  
}


export default FollowContext