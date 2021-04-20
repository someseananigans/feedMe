import axios from 'axios'

const Comment = {
  create: (commentInfo) => axios.post(`api/comment/${commentInfo.post_id}`,
    commentInfo, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  })
}

export default Comment
