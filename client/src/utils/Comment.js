import axios from 'axios'

const Comment = {
  create: (commentInfo) => axios.post(`api/comment/${commentInfo.post_id}`,
    commentInfo, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  }),
  getFromPost: post_id => axios.get(`api/comments/${post_id}`)
}

export default Comment
