import { ProfilePosts, ProfileInfo, Navbar } from '../components/'

const Profile = () => {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: '64px' }}>
        <ProfileInfo />
        <ProfilePosts />
      </div>

    </>

  )
}

export default Profile