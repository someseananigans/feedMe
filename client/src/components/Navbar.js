import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Badge, MenuItem, Menu, SvgIcon } from '@material-ui/core'
import { Search as SearchIcon, AccountCircle, MoreVert as MoreIcon, ExitToApp as ExitToAppIcon } from '@material-ui/icons'
import { Modal } from '../components'
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import User from '../utils/User'
// import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#00bcd4',
    boxShadow: 'none',
    padding: '0 24px',
    borderBottom: '1px solid gray'
  },
  navWrap: {
    maxWidth: '975px',
    alignSelf: 'center',
    width: '100%'
  },
  imageWrap: {
    display: 'flex',
    flex: '1 9999 0%'
  },
  logo: {
    maxHeight: 60,
    maxWidth: 100,
    cursor: 'pointer',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },

  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    flex: '1 0 0%',
    justifyContent: 'flex-end',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    }
  },
  sectionMobile: {
    flex: '1 0 0%',
    justifyContent: 'flex-end',
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  },
  logOut: {
    marginLeft: 20,
    alignSelf: 'center',
  },

  dropDownItems: {
    padding: '0 2px',
    paddingRight: '20px',
  },
  dropDown: {
    padding: '0 !important',
  },
}));

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}



// Logo URL
// https://dewey.tailorbrands.com/production/brand_version_mockup_image/794/5122938794_88d7d3a2-8613-40c2-8402-286cf1e711ac.png?cb=1619203943

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  // const [open, setOpen] = React.useState(false);


  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleGoToProfile = () => {
    history.push('/profile')
  }
  const handleGoHome = () => {
    history.push('/')
  }

  const handleLogOut = () => {
    localStorage.removeItem('user')
    history.push('/auth')
  }

  const [searchState, setSearchState] = useState({
    search: ''
  })
  const handleSearchChange = ({ target }) => {
    setSearchState({ ...searchState, search: target.value.toLowerCase() })
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleGoToProfile}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem className={classes.dropDownItems} onClick={handleGoHome} >
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={0} color="secondary">
            <HomeIcon />
          </Badge>
        </IconButton>
        <p>Home</p>
      </MenuItem>
      <MenuItem className={classes.dropDownItems} onClick={handleGoToProfile}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem className={classes.dropDownItems}>
        <Modal
          comp='createPostText'
        />
        {/* <p>Create a Post</p> */}
      </MenuItem>
      <MenuItem className={classes.dropDownItems} onClick={handleGoHome} >
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={0} color="secondary">
            <ExitToAppIcon />
          </Badge>
        </IconButton>
        <p>Log Out</p>
      </MenuItem>
    </Menu>
  );



  // const [allUsersState, setAllUsersState] = useState({
  //   users: []
  // });

  // const handleAutoSearchChange = () => {
  //   User.getUsers()
  //   .then(({ data: users }) => {
  //     setAllUsersState({...allUsersState, users})
  //   })
  //   .catch(err => {
  //     console.error(err)
  //   })
  // }

  // useEffect(() => {
  //   User.getUsers()
  //   .then(({ data: users }) => {
  //     setAllUsersState({...allUsersState, users})
  //   })
  //   .catch(err => {
  //     console.error(err)
  //   })
  // }, [])

  return (
    <div className={classes.grow}>
      <AppBar position="relative" className={classes.appBar}>
        <Toolbar className={classes.navWrap}>
          <div className={classes.imageWrap}>

            <img onClick={handleGoHome} className={classes.logo} src="https://dewey.tailorbrands.com/production/brand_version_mockup_image/730/5123634730_d958ae6a-bc04-4366-b183-35e4a8407a94.png?cb=1619210685" alt="logo" />
          </div>
          <div className={classes.search}>
            <form onSubmit={(event) => {
              event.preventDefault()
              window.location = `/search/${searchState.search}`
            }}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                onChange={handleSearchChange}
                value={searchState.search}
                placeholder="Search for a user…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </form>

          </div>
          {/* <Autocomplete
            openOnFocus={false}
            className={classes.search}
            options={allUsersState.users}
            // onChange={handleAutoSearchChange}
            getOptionLabel={(option) => option.username}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Search a username..." variant="outlined" />}
            renderOption={(option) => <Typography onClick={() => window.location = `/user/${option._id}`} noWrap>{option.username}</Typography>}
         /> */}
          {/* <div className={classes.grow} /> */}
          <div className={classes.sectionDesktop}>
            <Modal
              comp='createPost'
            />
            <IconButton
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleGoToProfile}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <IconButton aria-label="" color="inherit" onClick={handleGoHome}>
              <Badge badgeContent={0} color="secondary">
                <HomeIcon />
              </Badge>
            </IconButton>

            <Typography onClick={handleLogOut} className={classes.logOut} style={{ cursor: 'pointer' }}>Log Out</Typography>
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

export default Navbar