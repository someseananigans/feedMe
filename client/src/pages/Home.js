import { Navbar, Post, Suggested } from '../components'
import '../index.css'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="cols">

      </div>
      <div className="cols">
        <Post/>
      </div>
      <div className="cols col3">
        <Suggested />
      </div>
    </>

  )
}

export default Home