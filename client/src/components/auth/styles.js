import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    position: 'relative'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
    marginBottom: theme.spacing(2),
  },
  parent: {
    position: 'relative',
    maxWidth: '100%',
    flexBasis: '100%',
    padding: '8px'
  },
  child: {
    position: 'absolute',
    width: '100%',
    left: '425px',
    bottom: '35px',
    justifyContent: 'left',
    [theme.breakpoints.down('xs')]: {
      left: '150px',
    }
  },
  loginSnack: {
    top: '120px',
    position: 'absolute',
    width: '100%'
  }
}));