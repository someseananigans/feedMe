import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { Home, Profile, Login } from './pages'
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
      </Switch>
    </Router>
  )
}

export default App;
