import { Navbar, Post } from '../components'
import { Box } from '@material-ui/core'

const Home = () => {
  return (
    <>
      <Navbar />
      <Box display="flex" alignItems="center" flexDirection="column">

        <Post location="home"/>
      </Box>
    </>

  )
}

export default Home