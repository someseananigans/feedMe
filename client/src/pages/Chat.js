import { Navbar, Dm } from '../components'


const Chat = ({ match }) => {
  return (
    <>
      <Navbar />
      <Dm roomCode={match.params.room} />
    </>
  )
}

export default Chat
