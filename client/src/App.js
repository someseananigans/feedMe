import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import {Home, Profile, Login, User} from './pages'
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
        <Route exact path='/profile'>
          <LockedView>
            <Profile />
          </LockedView>
        </Route>
        <Route path='/auth' exact component={Login} />
        <Route path='/user/:id' exact component={User} />
      </Switch>
    </Router>
  )
}

export default App;
