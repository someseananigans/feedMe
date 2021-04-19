import axios from 'axios'

const Comment = {
  create: (details, post_id) => axios.post(`/comment/${post_id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  })
}

export default Comment
