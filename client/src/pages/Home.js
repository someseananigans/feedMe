import { Navbar, Post, Suggested } from '../components'
import { Box } from '@material-ui/core'
import '../index.css'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="cols">

      </div>
      <div className="cols">
        <Post location="home"/>
      </div>
      <div className="cols col3">
        <Suggested />
      </div>
    </>

  )
}

export default Home