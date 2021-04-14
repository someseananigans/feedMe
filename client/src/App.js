import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { Home, Login, Profile } from './pages'
import { Navbar } from './components/index'


function App() {
  return (
    <Router>
      <div>
        <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
      </div>
    </Router>
  )
}

export default App;
