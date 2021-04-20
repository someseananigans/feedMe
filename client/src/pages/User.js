import { UserProf, Navbar } from '../components'

const User = ({match}) => {
  return (
    <>
    <Navbar />
    <UserProf id={match.params.id} />
    </>
  )
}

export default User