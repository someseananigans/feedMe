import { Navbar, Suggested, Cards } from '../components'
import '../index.css'
// import Cards from '../components/grams/Cards'


const Home = () => {
  return (
    <>
      <div className='container'>

        <div className='nav'>

          <Navbar />
        </div>


        <div className='wrapper'>

          <div className='posting'>
            <Cards />
          </div>
          <div className='suggests'>
            <div className='fixed'>
              <Suggested />
            </div>
          </div>
        </div>

      </div>
    </>

  )
}

export default Home