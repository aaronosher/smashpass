import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';

import styles from './styles';
import { login } from '../../Modules/auth/actions';

import Step1 from './steps/step1';
import Step2 from './steps/step2';

class Home extends React.Component {
  render() {
    const { classes, navigate } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="absolute" color="default" className={classes.root}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap className={classes.grow}>
              <NavLink to="/" style={{textDecoration: 'none', color: '#000'}}>SmashPass IDP</NavLink>
            </Typography>
            <Button color="inherit" onClick={navigate('/login')}>Login</Button>
            <Button color="inherit" onClick={navigate('/signUp')}>Sign Up</Button>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          <Step1 />
        </main>
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});
const mapDispatchToProps = dispatch => ({
  navigate: (path) => () =>  dispatch(push(path)),
  loginUser: (email, smash) => dispatch(login(email, smash)),
});

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps),
)(Home);
