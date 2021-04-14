import { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import User from '../../utils/User'
import { useHistory } from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import Input from './Input'


const initialState = { firstName: '', lastName: '', email: '', password: '', repeatPassword: '' }

const Auth = () => {
  const classes = useStyles()
  const history = useHistory
  const [showPassword, setShowPassword] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [formData, setFormData] = useState(initialState)

  const [loginState, setLoginState] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
  })


  const handleInputChange = ({ target }) => {
    setLoginState({ ...loginState, [target.name]: target.value })
  }

  const handleRegister = event => {
    event.preventDefault()
    User.register({
      name: `${loginState.firstName} ${loginState.lastName}`,
      email: loginState.email,
      password: loginState.password,
      repeatPassword: loginState.repeatPassword
    })

      .then(() => {
        alert('User registered!')
        setLoginState({ ...loginState, name: '', email: '', password: '', repeatPassword: '' })
      })
      .catch(err => console.log(err))
  }

  const handleLogin = (event) => {
    event.preventDefault()
    User.login({
      email: loginState.email,
      password: loginState.password
    })
      .then(({ data }) => {
        localStorage.setItem('user', data)
        window.location = '/'
      })
      .catch(err => console.log(err))

  }
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup)
    handleShowPassword(false)
  }

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

  const handleSubmit = () => {

  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleInputChange} half />
                <Input name="lastName" label="Last Name" handleChange={handleInputChange} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleInputChange} type="email" />
            <Input name="password" label="Password" handleChange={handleInputChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleInputChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : "Sign In"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </Button>
            </Grid>

          </Grid>

        </form>
      </Paper>
    </Container>
  )
}
export default Auth