import axios from 'axios'

const User = {
  register: (user) => axios.post('/api/user/register', user),
  login: user => axios.post('/api/user/login', user),
  getUsers: () => axios.get('/api/users'),
  getUser: (id) => axios.get(`/api/users/${id}`),
  getNUsers: (count) => axios.get(`/api/userlist/${count}`),
  profile: () => axios.get('/api/user', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  }),
  edit: updates => axios.put('/api/user', updates, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  }),
  delete: () => axios.delete('/api/user', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  }),
  touchPost: details => axios.put('/api/post/interaction', details, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  }),
  touchUser: details => axios.put('/api/user/interaction', details, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  }),
  search: username => axios.get(`/api/users/search/${username}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  })
}

export default User
