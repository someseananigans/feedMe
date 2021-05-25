import { useState } from 'react'
import { User } from '../utils'
import { useHistory } from 'react-router-dom'

const FormContext = () => {
  const history = useHistory()

  const [showPassword, setShowPassword] = useState(false)
  const [isSignup, setIsSignup] = useState(false)

  const [registerState, setRegisterState] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  })

  const [loginState, setLoginState] = useState({
    username: '',
    password: ''
  })

  const [snackAlert, setAlert] = useState({})

  const [open, setOpen] = useState(false);

  const handleInputChange = ({ target }) => {
    if (isSignup) {
      setRegisterState({ ...registerState, [target.name]: target.value })
    } else {
      setLoginState({ ...loginState, [target.name]: target.value })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    isSignup ? handleRegister() : handleLogin()
  }

  // Switch between sign up and log in
  const switchMode = () => {
    setRegisterState({ name: '', email: '', username: '', password: '' })
    setAlert({})
    // setLoginState({ ...loginState, username: '', password: '' })
    setIsSignup((prevIsSignup) => !prevIsSignup)
    setShowPassword(false)
  }

  // Show Password Functionality
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

  const handleRegister = (event) => {
    User.register({
      name: registerState.name,
      username: registerState.username,
      email: registerState.email,
      password: registerState.password,
    })
      .then(({ data }) => {
        setAlert(data.status)

        if (data.message.includes("Success")) {
          User.login({
            username: registerState.username,
            password: registerState.password
          })
            .then(({ data }) => {
              if (data) {
                localStorage.setItem('user', data.user)
                // *** incorporate a logging in page transition ***
                history.push('/')
              }
            })
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
  }

  const handleLogin = async () => {
    await User.login({
      username: loginState.username,
      password: loginState.password
    })
      .then(({ data }) => {
        setAlert({ username: data.err })
        console.log(data.err)
        if (data.user) {
          localStorage.setItem('user', data.user)
          // *** incorporate a logging in page transition ***
          history.push('/')
        }
      })
      .catch(err => console.log(err))
  }

  // Close Snacks
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false)
    setAlert({})
  };


  return {
    showPassword, setShowPassword,
    isSignup, setIsSignup,
    registerState, setRegisterState,
    loginState, setLoginState,
    snackAlert, setAlert,
    open, setOpen,
    handleInputChange,
    handleSubmit,
    switchMode,
    handleShowPassword,
    handleClose
  }

}


export default FormContext