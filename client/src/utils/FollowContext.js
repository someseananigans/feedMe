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
    // User.touchPost({
    //   type,
    //   follow_user_id: 
    // })
  }


}


/// note ----> // <------------------ Interacting with User ---------------------->

// router.put('/user/interaction', passport.authenticate('jwt'), async (req, res) => {
//   try {
//     if (req.body.type === 'follow') {
//       await User.findByIdAndUpdate(req.user.id, { $addToSet: { following: req.body.follow_user_id } }, { "new": true })
//       await User.findByIdAndUpdate(req.body.follow_user_id, { $addToSet: { followers: req.user.id} }, { "new": true })
//     }
//     if (req.body.type === 'unfollow') {
//       await User.findByIdAndUpdate(req.user.id, { $pull: { following: req.body.follow_user_id } }, { "new": true })
//       await User.findByIdAndUpdate(req.body.follow_user_id, { $pull: { followers: req.user.id } }, { "new": true })
//     }
//   } catch (err) {
//     res.send(err)
//     return
//   }
//   res.json({
//     status: 200,
//     successfully: `Successfully ${req.body.type}ed`
//   })
// })
