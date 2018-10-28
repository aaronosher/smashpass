import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import history from './Store/history';
import theme from './theme';
import requireAuth from './Components/RequireAuth';
import HomePage from './Pages/Home';
import SignUpPage from './Pages/SignUp';
import LoginPage from './Pages/Login';
import WelcomePage from './Pages/Welcome';
import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/signup" component={SignUpPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/welcome" component={requireAuth(WelcomePage)} />
            <Route path="/" component={HomePage} />
          </Switch>
        </ConnectedRouter>
      </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
