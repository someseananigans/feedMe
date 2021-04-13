import axios from 'axios'

const User = {
  register: user => axios.post('/api/users/register', user),
  login: user => axios.post('/api/users/login', user),
  profile: () => axios.get('/api/users', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
  })
}

export default User
