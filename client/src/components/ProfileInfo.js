import { Avatar, Button } from '@material-ui/core'
import ProfileModal from './modals/ProfileModal'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import User from '../utils/User.js'
import { FollowContext } from '../utils'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
follow: {
  fontSize: 13,
    color: 'black'
},
following: {
  fontSize: 13,
    color: 'black'
},
}));

const ProfileInfo = ({ id }) => {
const classes = useStyles()

  const [userState, setUserState] = useState({
    user: {
      posts: [],
      following: [],
      followers: []
    }
  })

  useEffect(() => {
    if (id) {
      User.getUser(id)
        .then(({ data: user }) => {
          setUserState({ ...userState, user })
        })
        .catch(err => { console.log(err) })
    } else {
      User.profile()
        .then(({ data: user }) => {
          setUserState({ ...userState, user })
        })
    }
  }, [])
  
  const { user } = userState

  const {
    handleFollow, // follow or unfollow
    followAction, // follow or following (updated by followCheck) 
    followCheck, // within Suggested Users, checks to see if user has followed
  } = FollowContext()

  useEffect(() => {
    followCheck(user.following, user._id)
  }, [])


  console.log(user)

  return (
    <>
      <Profile>
        <AvatarField>
          <AvatarP aria-label="userAvatar" src={user.profile}></AvatarP>
        </AvatarField>
        <CharacterField>
          <ProfileRow>
            <Username>{user.username}</Username>
            {
            (!id) ? <ProfileModal /> : 
            <Button
              variant="contained"
              className={followAction === 'follow' ? classes.follow : classes.following}
              onClick={(() => handleFollow(user._id))}
            >
              {followAction}
            </Button>
            }
          </ProfileRow>
          <Ninja>

            <StatRow>
              <Stats>
                <Data>{user.posts.length}</Data>
                <Category>{user.posts.length == 1 ? 'post' : 'posts'}</Category>
              </Stats>
              <Stats>
                <Data>{user.followers.length}</Data>
                <Category>{user.followers.length == 1 ? 'follower' : 'followers'}</Category>
              </Stats>
              <Stats>
                <Data>{user.following.length}</Data>
                <Category>following</Category>
              </Stats>
            </StatRow>

            <BioRow>
              <Bio>
                <Name>{user.name}</Name>
                <Summary>{user.bio}</Summary>
              </Bio>
            </BioRow>
          </Ninja>

          {/* on 730px down */}
        </CharacterField>
        <DetailsTablet>
          <BioRow>
            <Bio>
              <Name>{user.name}</Name>
              <Summary>{user.bio}</Summary>
            </Bio>
          </BioRow>
          <StatRow>
            <Stats>
              <Data>{user.posts.length}</Data>
              <Category>{user.posts.length == 1 ? 'post' : 'posts'}</Category>
            </Stats>
            <Stats>
              <Data>{user.followers.length}</Data>
              <Category>{user.followers.length == 1 ? 'follower' : 'followers'}</Category>
            </Stats>
            <Stats>
              <Data>{user.following.length}</Data>
              <Category>following</Category>
            </Stats>
          </StatRow>

        </DetailsTablet>
      </Profile>


    </>
  )
}
export default ProfileInfo

const Profile = styled.div`
  margin-top: 35px;
  display: flex;
  flex-direction: row;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  flex-wrap: wrap;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  @media screen and (max-width: 730px) {
    width: 100%;
  }
`
const AvatarField = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 35%;
  place-items: center;
  @media screen and (max-width: 730px) {
    width: 20%;
    justify-content: left;
  }
`

const CharacterField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 65%;
  @media screen and (max-width: 730px) {
    width: 70%;
    margin-right: 
  }
`
const Ninja = styled.div`
  @media screen and (max-width: 730px) {
    display: none;
  }
`

const DetailsTablet = styled.div`
  display: none;
  justify-content: left;
  align-items: center;
  padding: 6px 0;
  @media screen and (max-width: 730px) {
    display: flex;
    flex-direction: column;
    display: contents
  }
`
const ProfileRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  padding: 6px 0;
  @media screen and (max-width: 730px) {
    flex-direction: column;
  }
`
const BioRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  padding: 6px 0;
  @media screen and (max-width: 730px) {
    padding: 25px 15px;
    margin-right: auto;
  }
`

const StatRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  padding: 15px 0;
  @media screen and (max-width: 730px) {
    width: 100%;
    border-top: 1px solid #b1b1b1;
    border-bottom: 1px solid #b1b1b1;
    justify-content: space-around;
  }
`

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 730px) {
    flex-direction: column;
    place-items: center;
  }
`

const Data = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  margin-right: 5px;
`

const Category = styled.p`
  font-size: 14px;
  margin: 0;
  margin-right: 40px;
  @media screen and (max-width: 730px) {
    color: #8f8f8f;
    margin: 0;
  }
`

const AvatarP = styled(Avatar)`
  width: 150px;
  height: 150px;
  @media screen and (max-width: 730px) {
    width: 75px;
    height: 75px;
  }
`
const Bio = styled.div`

`
const Username = styled.p`
  font-size: 30px;
  font-weight: 100;
  margin: 0;
  margin-right: 10px;
  @media screen and (max-width: 730px) {
    margin-right: auto;
  }
`

const Name = styled.p`
  font-size: 17px;
  font-weight: 600;
  margin: 0;
  @media screen and (max-width: 730px) {
    font-size: 14px;
  }
`

const Summary = styled.span`
  font-size: 17px;
  @media screen and (max-width: 730px) {
    font-size: 14px;
  }
`