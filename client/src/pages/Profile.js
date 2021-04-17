import { CreatePost, ProfilePosts, Post, ProfileModal, EditProfile } from '../components/'
import Navbar from '../components/Navbar'
import Post from '../components/posts/Post'





const Profile = () => {
  return (
    <>
    <Navbar />
      <h1>Profile Page</h1>
    <Post location="profile"/>
    <CreatePost />
    <ProfileModal />
    <ProfilePosts />

    </>
      
  )
}

export default Profile