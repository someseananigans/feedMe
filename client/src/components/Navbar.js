import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CardMedia from '@material-ui/core/CardMedia';


https://dewey.tailorbrands.com/production/brand_version_mockup_image/30/5052737030_735d5db1-7053-4625-88d5-87ad4e490ea4.png?cb=1618339814

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles()
  
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Re-instagram
    </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar