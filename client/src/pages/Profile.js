import { ProfilePosts } from '../components/'
import Navbar from '../components/Navbar'





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