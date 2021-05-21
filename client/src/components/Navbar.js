import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { fade, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Badge, MenuItem, Menu, SvgIcon, Avatar, ClickAwayListener } from '@material-ui/core'
import { Search as SearchIcon, AccountCircle, MoreVert as MoreIcon, ExitToApp as ExitToAppIcon } from '@material-ui/icons'
import { Modal } from '../components'
import { User } from '../utils'
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
  searchDropDown: {
    position: 'absolute',
    background: '#f0f0f0',
    borderRadius: '4px',
    width: '100%',
    color: '#272727',
    marginTop: '10px',
    overflowY: 'auto',
    maxHeight: '450px'
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
    alignItems: 'center',
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
    cursor: 'pointer',
  },

  dropDownItems: {
    padding: '0 2px',
    paddingRight: '20px',
  },
  dropDown: {
    padding: '0 !important',
  },
  avatar: {
    height: '40px',
    width: '40px',
    cursor: 'pointer',
    border: '4px solid transparent',
    '&:hover': {
      border: '4px solid #00b5cc',
    },
  },
  list: {
    listStyleType: 'none',
    margin: 0,
    padding: '10px 15px'
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    height: '60px',
    fontWeight: '500',
    paddingLeft: '5px'
  },
  listHead: {
    display: 'flex',
    alignItems: 'center',
    height: '45px',
    fontWeight: '500'
  },
  itemAvatar: {
    height: '40px',
    width: '40px',
    paddingRight: '10px',
  }
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

  const [searchState, setSearchState] = useState('')

  const [allUsers, setAllUsers] = useState([])

  const handleSearchChange = ({ target }) => {
    setSearchState(target.value.toLowerCase())
    User.search(target.value.toLowerCase())
      .then(({ data: users }) => {
        setAllUsers(users)
        console.log(users)
      })
      .catch(err => {
        console.error(err)
      })
    if (target.value === '' || target.value === ' ') {
      setAllUsers([])
    }
  }


  const [currentUser, setCurrentUser] = useState({ profile: '' });

  useEffect(() => {
    User.profile()
      .then(({ data: user }) => {
        setCurrentUser(user)
        console.log(user)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={'primary-search-account-menu'}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleGoToProfile}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={'primary-search-account-menu-mobile'}
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
        <IconButton color="inherit">
          <Badge badgeContent={0} color="secondary">
            <ExitToAppIcon />
          </Badge>
        </IconButton>
        <p>Log Out</p>
      </MenuItem>
    </Menu>
  );



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
              searchState && history.push(`/search/${searchState}`)
              setAllUsers([])
            }}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                onChange={handleSearchChange}
                value={searchState}
                placeholder="Search for a user…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </form>
            {/* This Search Drop Down -> clickaway or empty to clear */}
            <ClickAwayListener onClickAway={(() => setAllUsers([]))}>
              <div className={classes.searchDropDown} >
                {allUsers.length >= 1 &&
                  <ul className={classes.list}>
                    <li
                      className={classes.listHead}
                      style={{ fontWeight: '500' }} >
                      <p>Search Results</p>
                    </li>
                    {allUsers.map(user =>
                      <li
                        className={classes.listItem}
                        onClick={() => { history.push(`/${user._id}`) }}>
                        <Avatar
                          className={classes.itemAvatar}
                          src={user.profile ? user.profile : 'https://firebasestorage.googleapis.com/v0/b/reinsta-884d1.appspot.com/o/images%2FGram1621567414811?alt=media&token=81b10f2f-99f6-4308-91d6-8515359b588b'} />
                        <div>
                          <p style={{ margin: 0, }}>{user.username}</p>
                          <p style={{ margin: 0, fontWeight: 100 }}>{user.name}</p>
                        </div>
                      </li>
                    )}
                  </ul>
                }
              </div>
            </ClickAwayListener>

          </div>

          <div className={classes.sectionDesktop}>
            <Modal comp='createPost' />

            <Avatar
              className={classes.avatar}
              onClick={handleGoToProfile}
              alt="profileImg"
              src={currentUser.profile ? currentUser.profile : 'https://firebasestorage.googleapis.com/v0/b/reinsta-884d1.appspot.com/o/images%2FGram1621567414811?alt=media&token=81b10f2f-99f6-4308-91d6-8515359b588b'} />
            <IconButton color="inherit" onClick={handleGoHome}>
              <Badge badgeContent={0} color="secondary">
                <HomeIcon />
              </Badge>
            </IconButton>

            <Typography
              onClick={handleLogOut}
              className={classes.logOut}>
              Log Out
            </Typography>
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={'primary-search-account-menu-mobile'}
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