import { Avatar, Button, Paper, Grid, Typography, Container, Fab, Card, TextField } from '@material-ui/core'
import EditProfile from './EditProfile'
import styled from 'styled-components'

const UserProfile = () => {
  return (

    <Profile>
      <CharacterField>
        <AvatarP aria-label="userAvatar" src=""></AvatarP>
        <Stats>
          <Data>123</Data>
          <Field>Posts</Field>
        </Stats>
        <Stats>
          <Data>234</Data>
          <Field>Followers</Field>
        </Stats>
        <Stats>
          <Data>345</Data>
          <Field>Following</Field>
        </Stats>
      </CharacterField>

      <Bio>
        <Name>Name/Username</Name>
        <Bio>Bio</Bio>
      </Bio>
      <Buttons>
        <EditProfile />
      </Buttons>
    </Profile>

  )
}

export default UserProfile


const Profile = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`

const CharacterField = styled.div`
  display: flex;
  flex-direction: row;
`

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
`

const Data = styled.h3`
  
`

const Field = styled.p`

`

const AvatarP = styled(Avatar)`

`