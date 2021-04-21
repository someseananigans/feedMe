import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { Home, Profile, Login, User, Search } from './pages'
import { LockedView } from './utils'


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <LockedView>
            <Home />
          </LockedView>
        </Route>
        <Route exact path='/auth' component={Login} />
        <Route exact path='/profile'>
          <LockedView>
            <Profile />
          </LockedView>
        </Route>
        <Route exact path='/user/:id' component={User} />
        <LockedView>
          <Route exact path='/search/:username' component={Search} />
        </LockedView>
      </Switch>
    </Router>
  )
}

export default App;
