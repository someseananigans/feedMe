import { ProfilePosts, Navbar, ProfileInfo } from '../components'
import { useState, useEffect } from 'react'
import { FollowContext, User } from '../utils'

const UserProfile = ({ match }) => {

  const {
    handleFollow,
    followAction,
    followCheck,
    update, setUpdate
  } = FollowContext()

  const [thisUser, setThisUser] = useState({
    posts: [],
    following: [],
    followers: [],
    _id: ''
  })

  const [currentUser, setCurrentUser] = useState({
    posts: [],
    following: [],
    followers: [],
    _id: ''
  })

  useEffect(() => {
    if (match) {
      User.getUser(match.params.id)
        .then(({ data: user }) => {
          setThisUser(user)
          User.profile()
            .then(({ data: currentUser }) => {
              setCurrentUser(currentUser)
              followCheck(currentUser.following, user._id)
              setUpdate('updated')
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    } else {
      User.profile()
        .then(({ data: user }) => {
          console.log(user)
          setThisUser(user)
          setCurrentUser(user)
          setUpdate('updated')
        })
    }
  }, [update])


  return (
    <>
      <Navbar />

      <ProfileInfo
        id={match ? match.params.id : false}
        followAction={followAction}
        setUpdate={setUpdate}
        handleFollow={handleFollow}
        user={thisUser} />
      <ProfilePosts
        id={match ? match.params.id : false}
        user={thisUser}
        currentUser={currentUser}
      />
    </>
  )
}

export default UserProfile