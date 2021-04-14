import axios from 'axios'

const Post = {
  getAll: () => axios.get('/api/posts', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  }),
  create: post => axios.post('/api/posts', post, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  })
}

export default Post
