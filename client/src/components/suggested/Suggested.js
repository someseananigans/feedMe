import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Avatar, CardHeader, Typography, IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: 300,
      height: 400,
    },
  },
  suggestions: {
    marginLeft: 20,
    color: 'gray'
  },
  follow: {
    fontSize: 13,
    color: 'blue',
    textAlign: 'bottom'
  },
}));

const Suggested = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper>
        <CardHeader
          avatar={
            <Avatar aria-label="userAvatar" className={classes.avatar}>
            </Avatar>
          }
          title="username"
        />
        <Typography className={classes.suggestions}>Suggestions for you</Typography>
        <CardHeader
          avatar={
            <Avatar aria-label="userAvatar" className={classes.avatar}>
            </Avatar>
          }
          title="username"
          action={
            <IconButton className={classes.follow}>
              Follow
            </IconButton>
          }
        />
        <CardHeader
          avatar={
            <Avatar aria-label="userAvatar" className={classes.avatar}>
            </Avatar>
          }
          title="username"
          action={
            <IconButton className={classes.follow}>
              Follow
            </IconButton>
          }
        />
        <CardHeader
          avatar={
            <Avatar aria-label="userAvatar" className={classes.avatar}>
            </Avatar>
          }
          title="username"
          action={
            <IconButton className={classes.follow}>
              Follow
            </IconButton>
          }
        />
        <CardHeader
          avatar={
            <Avatar aria-label="userAvatar" className={classes.avatar}>
            </Avatar>
          }
          title="username"
          action={
            <IconButton className={classes.follow}>
              Follow
            </IconButton>
          }
        />
        
      </Paper>
    </div>
  );

}

export default Suggested
