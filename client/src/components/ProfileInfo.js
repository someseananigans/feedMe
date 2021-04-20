import { Avatar, Button, Paper, Grid, Typography, Container, Fab, Card, TextField } from '@material-ui/core'
import ProfileModal from './modals/ProfileModal'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import User from '../utils/User.js'


const ProfileInfo = () => {

  const [userState, setUserState] = useState({
    user: {}
  })

  useEffect(() => {
    User.profile()
      .then(({ data: user }) => {
        setUserState({ ...userState, user })
      })
  }, [])

  const { user } = userState

  return (

    <Profile>
      <AvatarField>
        <AvatarP aria-label="userAvatar" src={user.profile}></AvatarP>
      </AvatarField>
      <CharacterField>
        <RowField>
          <Username>{user.username}</Username>
          <ProfileModal />
        </RowField>

        <RowField>
          <Stats>
            <Data>123</Data>
            <Category>Posts</Category>
          </Stats>
          <Stats>
            <Data>234</Data>
            <Category>Followers</Category>
          </Stats>
          <Stats>
            <Data>345</Data>
            <Category>Following</Category>
          </Stats>
        </RowField>

        <RowField>
          <Bio>
            <Name>{user.name}</Name>
            <Summary>{user.bio}</Summary>
          </Bio>
        </RowField>
      </CharacterField>
    </Profile>
  )
}
export default ProfileInfo

const Profile = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: row;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
`
const AvatarField = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 35%;
  place-items: center;
`

const CharacterField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 65%;
`

const RowField = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  padding: 6px 0;
`

const Stats = styled.div`
  display: flex;
  flex-direction: row;
`

const Data = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  margin-right: 5px;
`

const Category = styled.p`
  font-size: 18px;
  margin: 0;
  margin-right: 40px;
`

const AvatarP = styled(Avatar)`
  width: 150px;
  height: 150px;
`
const Bio = styled.div`

`
const Username = styled.p`
  font-size: 30px;
  font-weight: 100;
  margin: 0;
  margin-right: 10px;
`

const Name = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`

const Summary = styled.span`
  font-size: 18px;
`