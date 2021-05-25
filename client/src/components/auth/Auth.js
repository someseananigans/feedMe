import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import Input from './Input'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FormContext from '../../utils/FormContext'


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Auth = () => {
  const classes = useStyles()

  const {
    showPassword,
    isSignup,
    registerState,
    loginState,
    snackAlert,
    handleInputChange,
    handleSubmit,
    switchMode,
    handleShowPassword,
    handleClose
  } = FormContext()


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
                <div className={classes.input} >
                  <Input name="name" label="Full Name" value={registerState.name} handleChange={handleInputChange} />
                </div>

                <div className={classes.input}>
                  <Input name="email" validate label="Email Address" value={registerState.email} handleChange={handleInputChange} type="email" autocomplete="off" />
                </div>
              </>
            )}

            <div className={classes.input}>
              <Input name="username" label="username" value={isSignup ? registerState.username : loginState.username} handleChange={handleInputChange} type="username" autocomplete="off" />
            </div>

            <div className={classes.input}>
              <Input name="password" label="Password" value={isSignup ? registerState.password : loginState.password} handleChange={handleInputChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
            </div>

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

      <div className={classes.snack}>
        {snackAlert && Object.entries(snackAlert).map(([key, value]) =>
          <>
            <Snackbar
              ClickAwayListenerProps={{ onClickAway: () => null }}
              open={snackAlert[key] ? true : false}
              autoHideDuration={600000}
              className={classes.child}
              onClose={handleClose} >

              <Alert style={{ flex: 1 }} onClose={handleClose} severity="error">
                {value}
              </Alert>

            </Snackbar>
          </>
        )}
      </div>

    </Container >
  )
}
export default Auth

