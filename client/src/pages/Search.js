import { Navbar, Search } from '../components/'

const Search1 = ({ match }) => {
    
  return (
    <>
      <Navbar />
      <Search searchQuery={match.params.username} />
    </>

  )
}

export default Search1