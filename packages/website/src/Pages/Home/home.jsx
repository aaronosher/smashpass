
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
import banner from '../../Images/banner.png';

class Home extends React.Component {

  render() {
    const { classes, navigate } = this.props;

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
          <Paper className={classes.paper}>
            <img src={banner} alt="SmashPass Banner" width={200} className={classes.banner} />
            <Typography variant="h6" component="h6" gutterBottom>
              Welcome to SmashPass
            </Typography>
            <Typography variant="body2" gutterBottom>
              This is SmashPass, a novelty way for password-less authentication.
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>What it does?</strong><br />
              SmashPass is a password-less Identity Provider that uses machine learning to create a model of your characteristic smashing patterns. We use the model to authenticate you, and only you, every single time.
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>How it works?</strong><br />
              Using a small neural network, SmashPass identifies patterns in your keyboard *smashing* which are then used to build a model allowing you to authenticate by caressing the keyboard in your own unique way.
            </Typography>
            <Button color="primary" onClick={navigate('/signUp')}>Sign Up</Button>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  navigate: (path) => () =>  dispatch(push(path)),
});

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps),
)(Home);
