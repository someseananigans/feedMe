import {Avatar, makeStyles} from '@material-ui/core'
import { useState, useEffect } from 'react'
import User from '../utils/User.js'
import ProfileModal from './modals/ProfileModal'

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(18),
    height: theme.spacing(18),
    display: 'inline-flex',
    marginRight: 60
  },
  userInfo: {
    marginTop: 75,
    marginLeft: 135,
    alignItems: 'center',
    display: 'inline-flex',
    fontSize: 26,

  },
  name: {
    fontSize: 16
  }
}));

const ProfileInfo = () => {
  const classes = useStyles();
  const [userState, setUserState] = useState({
    user: {}
  })

  useEffect(() => {
    User.profile()
      .then(({data: user}) => {
        setUserState({ ...userState, user})
      })
  }, [])
 

  return (
    <>
    <div className={classes.userInfo}>
    <Avatar aria-label="userAvatar"  src={userState.user.profile} className={classes.large} > 
    </Avatar>
      <div>
        {userState.user.username}
        <br />
        <div className={classes.name}>
        {userState.user.name}
        </div>
        <ProfileModal />
      </div>
    </div>
    </>
  )
}
export default ProfileInfo