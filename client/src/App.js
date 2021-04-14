import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import {Home, Profile, Login} from './pages'


function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/profile' exact component={Profile} />
          <Route path='/auth' exact component={Login} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
