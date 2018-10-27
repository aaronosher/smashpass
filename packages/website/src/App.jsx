import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import history from './Store/history';
import theme from './theme';
import HomePage from './Pages/Home';
import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={HomePage} exact />
          </Switch>
        </ConnectedRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
