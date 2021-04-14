import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import {Home, Profile, Login} from './pages'


function App() {
  return (
    <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/profile' exact component={Profile} />
          <Route path='/auth' exact component={Login} />
        </Switch>
    </Router>
  )
}

export default App;
