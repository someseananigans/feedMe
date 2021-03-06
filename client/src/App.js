import {
  BrowserRouter as Router,
  Switch,
  Route, Redirect
} from 'react-router-dom'
import { Home, Login, UserProfile, Search } from './pages'
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
              <UserProfile />
            </LockedView>
          </Route>
          <Route exact path='/reloadProfile' >
            <Redirect to="/profile" />
          </Route>
          <Route exact path='/reloadHome' >
            <Redirect to="/" />
          </Route>
          <Route exact path='/:id' component={UserProfile} />
          <LockedView>
            <Route exact path='/search/:username' component={Search} />
          </LockedView>
          {/* <LockedView>
            <Route exact path='/chat/:room' component={Chat} />
          </LockedView> */}
        </Switch>
      </Router>
    </MuiThemeProvider>
  )
}

export default App;
