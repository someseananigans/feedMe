import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'




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
