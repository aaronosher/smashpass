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
import Paper from '@material-ui/core/Paper';
import styles from './styles';

class Welcome extends React.Component {
  render() {
    const { classes, navigate, user } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="absolute" color="default" className={classes.root}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap className={classes.grow}>
              SmashPass IDP
            </Typography>
            <Button color="inherit" onClick={navigate('/login')}>Login</Button>
            <Button color="inherit" onClick={navigate('/signUp')}>Sign Up</Button>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          {!!user && (
          <Paper className={classes.paper}>
            <Typography variant='h6' component='h6'>
              Welcome
              &nbsp;
              {user.firstName}
              &nbsp;
              {user.lastName}
            </Typography>
            <Typography>
              Your email address is
              &nbsp;
              {user.email}
            </Typography>
          </Paper>
          )}
        </main>
      </React.Fragment>
    );
  }
}

Welcome.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});
const mapDispatchToProps = dispatch => ({
  navigate: (path) => () =>  dispatch(push(path)),
});

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps),
)(Welcome);
