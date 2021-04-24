import { useState, useEffect } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import {User} from '../../utils'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import Input from './Input'


const Auth = () => {
  const classes = useStyles()

  const [showPassword, setShowPassword] = useState(false)
  const [isSignup, setIsSignup] = useState(false)

  const [registered, setRegistered] = useState({
    email: [],
    username: []
  })

  const [loginState, setLoginState] = useState({
    firstName: '',
    lastName: '',
    name: '',
    username: '',
    email: '',
    password: ''
  })

  const [snackAlert, setAlert] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  })
  
  const [valid, setValid] = useState(false)

  const handleInputChange = ({ target }) => {
    setLoginState({ ...loginState, [target.name]: target.value })
  }

  const handleValidation = () => {
    let alerts = {
      name: '',
      username: '',
      email: '',
      password: ''
    }
    const emailValid = loginState.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
    !loginState.firstName && (alerts.name = 'Please Enter Your Full Name')
    !loginState.lastName && (alerts.name = 'Please Enter Your Full Name')
    !loginState.username && (alerts.name = 'Please Enter a Username')
    !loginState.password && (alerts.name = 'Please Enter a Pasword')
    !emailValid && (alerts.email = 'Please Enter a Valid Email')
    registered.email.indexOf(loginState.email) !== -1 && (alerts.email = 'This Email has Already Been Registered')
    registered.username.indexOf(loginState.username) !== -1 && (alerts.username = 'This Username has Already Been Registered')
    console.log(alerts)
    setAlert(alerts)
    if (!alerts.name && !alerts.username && !alerts.email && !alerts.password) {
      setValid(true)
    } else {
      setValid(false)
    }
    console.log(valid)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleValidation()
    isSignup ? handleRegister() : handleLogin()
  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup)
    handleShowPassword(false)
  }

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

  const handleRegister = (event) => {
    if (valid) {
      User.register({
        name: `${loginState.firstName} ${loginState.lastName}`,
        username: loginState.username,
        email: loginState.email,
        password: loginState.password,
      })
        .then((data) => {
          console.log(data)
          // alert('User registered!')
          // setLoginState({ ...loginState, firstName: '', lastName: '', name: '', username: '', email: '', password: '', repeatPassword: ''})
          // window.location = '/auth'
        })
        .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    User.getUsers()
      .then(({data: users}) => {
        let emails = []
        let usernames = []
        users.forEach(user => {
          emails.push(user.email)
          usernames.push(user.username)
        });
        setRegistered({email: emails, username: usernames})
        console.log(registered)
      })
      .catch(err => console.log(err))
  }, [])

  const handleLogin = async () => {
    await User.login({
      username: loginState.username,
      password: loginState.password
    })
      .then(({ data }) => {
        if (data) {
          localStorage.setItem('user', data)
          window.location = '/'
        } else {
          alert('Username or password are incorrect')
        }
      })
      .catch(err => console.log(err))
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
                <Input name="firstName" label="First Name" value={loginState.firstName}  handleChange={handleInputChange} half />
                <Input name="lastName" label="Last Name" value={loginState.lastName} handleChange={handleInputChange} half />
                <Input name="email" validate label="Email Address" value={loginState.email} handleChange={handleInputChange} type="email" autocomplete="off" />
              </>
            )}
            <Input name="username" label="username" value={loginState.username} handleChange={handleInputChange} type="username" autocomplete="off" />
            <Input name="password" label="Password" value={loginState.password} handleChange={handleInputChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
          </Grid>
          <Button type="submit" onClick={(event) => handleSubmit(event)} fullWidth variant="contained" color="primary" className={classes.submit}>
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