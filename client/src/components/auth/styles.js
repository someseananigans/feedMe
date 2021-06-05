import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    transition: 'all 0.2s ease-in-out'
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
  input: {
    position: 'relative',
    maxWidth: '100%',
    flexBasis: '100%',
    padding: '8px'
  },
  child: {
    position: 'relative',
    width: '285px',
    margin: '5px',
    left: 0,
    transform: 'none'
  },
  snack: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    zIndex: 99,
    marginTop: '30px'
  },
  snackChild: {
    left: 'unset !important',
    transform: 'unset !important',
    position: 'unset !important'
  }
}));