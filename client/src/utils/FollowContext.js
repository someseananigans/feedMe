import { useState } from 'react'
import { Comment as Cmnt, User } from '../utils'

const FollowContext = () => {

  // start follow functionality
  const [following, setFollowing] = useState({
    users: []
  })

  const [followAction, setFollowAction] = useState('follow')

  const handleFollow = (focusedUser) => {
    User.touchUser({
      type: followAction,
      follow_user_id: focusedUser
    })
      .then(data => {
        setFollowAction(followAction === 'follow' ? 'following' : 'follow')
      })
      .catch(err => console.log(err))
  }

  const followCheck = (usersFollow, focusedUser) => {
    setFollowAction(usersFollow.indexOf(focusedUser) !== -1 ? 'following' : 'follow')
  }

  // end follow functionality

  // start like functionality

  const [likeAction, setLikeAction] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  const likeCheck = (likedByUsers, currentUser) => {
    setLikeAction(likedByUsers.indexOf(currentUser._id) !== -1 ? 'unlike' : 'like')
  }

  const handleLike = async (postId) => {
    await User.touchPost({
      type: likeAction,
      post_id: postId
    })
      .then()
      .catch(err => console.log(err))
    setLikeCount(likeAction === 'like' ? (likeCount + 1) : (likeCount - 1))
    setLikeAction(likeAction === 'like' ? 'unlike' : 'like')
  }

  // end like functionality

  // start comment functionality

  const [cmntList, setCmntList] = useState([])

  const [comment, setComment] = useState({
    body: '',
    post_id: ''
  })

  const handleCommentInput = ({ target }) => {
    setComment({ ...comment, body: target.value, post_id: target.id })
  }

  const handleComment = () => {
    Cmnt.create({
      comment: comment.body,
      post_id: comment.post_id
    })
      .then(({ data: cmnt }) => {
        setComment({ ...comment, body: '', post_id: '' })
        setUpdate('Need Update')
      })
      .catch(err => console.error(err))
  }

  const [commentList, setCommentList] = useState([])

  // end comment functionality

  // start update functionality

  const [update, setUpdate] = useState('')

  // end update functionality 



  return {
    following, setFollowing,
    handleFollow,
    followAction, setFollowAction,
    followCheck,
    likeAction, setLikeAction,
    likeCount, setLikeCount,
    likeCheck,
    handleLike,
    comment, setComment,
    commentList, setCommentList,
    cmntList, setCmntList,
    handleComment,
    handleCommentInput,
    update, setUpdate
  }

}


export default FollowContext