import { CreatePost, Post, ProfileModal, EditProfile } from '../components/'
import Navbar from '../components/Navbar'


const Profile = () => {
  return (
    <>
    <Navbar />
      <h1>Profile Page</h1>
    <Post location="profile"/>
    <CreatePost />
    <profileModal />

    <EditProfile></EditProfile>
   


    </>
      
  )
}

export default Profile