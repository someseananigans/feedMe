import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import {Home, Profile, Login, User} from './pages'


function App() {
  return (
    <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/profile'exact component={Profile} />
          <Route path='/auth' exact component={Login} />
          <Route path='/user/:id' exact component={User} />
        </Switch>
    </Router>
  )
}

export default App;
