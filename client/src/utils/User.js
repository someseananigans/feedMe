import axios from 'axios'

const User = {
  register: (user) => axios.post('/api/user/register', user),
  login: user => axios.post('/api/user/login', user),
  getUsers: () => axios.get('/api/users'),
  profile: () => axios.get('/api/user', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  }),
  edit: updates => axios.put('/user', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  }),
  delete: () => axios.delete('/user', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  })
}

export default User
