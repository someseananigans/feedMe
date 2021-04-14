import { Navbar } from '../components'
import { Post } from '../components'
import { Box } from '@material-ui/core'

const Home = () => {
  return (
    <>
      <Navbar />
      <Box display="flex" alignItems="center" flexDirection="column">

        <Post />
        <Post />
        <Post />
        <Post />
      </Box>
    </>

  )
}

export default Home