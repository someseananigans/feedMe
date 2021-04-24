import { ProfilePosts, Navbar, ProfileInfo } from '../components'

const User = ({ match }) => {
  return (
    <>
      <Navbar />
      {/* <UserInfo id={match.params.id} />   
      ^^^ converted ProfileInfo to work interchangeably with UserInfo */}
      <ProfileInfo id={match.params.id}/>
      <ProfilePosts id={match.params.id} />
    </>
  )
}

export default User