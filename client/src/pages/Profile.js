import { CreatePost, ProfilePosts, Post, ProfileModal, EditProfile } from '../components/'
import Navbar from '../components/Navbar'

import PostModal from '../components/modals/PostModal'





const Profile = () => {
  return (
    <>
    <Navbar />
      <h1>Profile Page</h1>
    <CreatePost />
    <ProfileModal />
    <ProfilePosts />
    <PostModal />

    </>
      
  )
}

export default Profile