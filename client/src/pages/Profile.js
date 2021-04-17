import { CreatePost, ProfilePosts } from '../components/'
import Navbar from '../components/Navbar'
import Post from '../components/posts/Post'




const Profile = () => {
  return (
    <>
    <Navbar />
      <h1>Profile Page</h1>
    {/* <CreatePost /> */}
    {/* <Post location='profile'/> */}
    <ProfilePosts />

    </>
      
  )
}

export default Profile