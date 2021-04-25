import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { Home, Profile, Login, User, Search } from './pages'
import { LockedView } from './utils'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 370,
      sm: 500,
      md: 731,
      lg: 900,
      xl: 1920,
    },
  },
});


function App() {
  return (
    <MuiThemeProvider theme={theme}>
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
          <Route exact path='/:id' component={User} />
          <LockedView>
            <Route exact path='/search/:username' component={Search} />
          </LockedView>
        </Switch>
      </Router>
    </MuiThemeProvider>
  )
}

export default App;
