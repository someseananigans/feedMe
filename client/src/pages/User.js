import { UserProf, Navbar, UserInfo } from '../components'

const User = ({match}) => {
  return (
    <>
    <Navbar />
    <UserInfo id={match.params.id} />
    <UserProf id={match.params.id} />
    </>
  )
}

export default User