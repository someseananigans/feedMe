import { Redirect } from 'react-router-dom'

const LockedView = (props) => {

  return (
    <>
      {
        localStorage.getItem('user') ?
          props.children
          :
          <Redirect to="/auth" />
      }
    </>
  )
}

export default LockedView