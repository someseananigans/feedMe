import { Navbar, Dm } from '../components'


const Chat = ({ room }) => {
  return (
    <>
      <Navbar />
      <Dm roomCode={match.params.room} />
    </>
    
  )
}

export default Chat
