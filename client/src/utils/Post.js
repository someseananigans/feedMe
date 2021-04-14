import axios from 'axios'

const Post = {
  getAll: () => axios.get('/api/posts', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  }),
  // May not be necessry. User already contains its post... but not comments. Can include comments in back-end if using the user to call and populate whole page.
  // getOwned: () => axios.get('/api/user/posts', post, {
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem('user')}`
  //   }
  // }),
  make: post => axios.post('/api/post', post, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  }),
  edit: (post_id, post) => axios.put(`/api/post/${post_id}`, post, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  }),
  delete: (post_id) => axios.delete(`/api/post/${post_id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  }),
}

export default Post
