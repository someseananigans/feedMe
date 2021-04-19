import { ProfilePosts, ProfileModal, ProfileInfo } from '../components/'
import Navbar from '../components/Navbar'







const Profile = () => {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: '64px' }}>
        <ProfileInfo />
        <ProfilePosts />
        <ProfileModal />
      </div>

    </>

  )
}

export default Profile