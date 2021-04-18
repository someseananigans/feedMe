import { CreatePost, ProfilePosts, Post, ProfileModal, EditProfile } from '../components/'
import Navbar from '../components/Navbar'






const Profile = () => {
  return (
    <>
      <Navbar />
      <div style={{ marginTop: '64px' }}>

        <ProfilePosts />
        <ProfileModal />
      </div>

    </>

  )
}

export default Profile