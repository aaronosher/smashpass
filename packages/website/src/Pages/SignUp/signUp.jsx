
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { isValid, isDirty, getFormValues } from 'redux-form';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import DetailsStep from './steps/details';
import SmashesStep from './steps/smashes';
import LocationStep from './steps/location';
import styles from './styles';
import { submit } from '../../Modules/signup';
import { push } from 'connected-react-router';

const steps = ['Details', 'Smashes', 'Location'];

class Checkout extends React.Component {
  state = {
    activeStep: 0,
  };

  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return <DetailsStep validEmitter={this.handleValidStep} />;
      case 1:
        return <SmashesStep validEmitter={this.handleValidStep} />;
      case 2:
        return <LocationStep validEmitter={this.handleValidStep} />;
      default:
        throw new Error('Unknown step');
    }
  }

  canNext = () => {
    const step = this.state.activeStep;
    const { location, details, smashes } = this.props;

    switch (step) {
      case 0:
        return (details.valid && details.dirty)
      case 1:
        return (smashes.length >= 50);
      case 2:
        return (location.valid && location.dirty)
      default:
        return true;
    }
  }

  handleNext = () => {
    const { location, smashes, details, submitSignUp } = this.props;
    if (this.state.activeStep === 2) {
      console.log('sign up');
      submitSignUp({
        first_name: details.values.firstName,
        last_name: details.values.lastName,
        email: details.values.email,
        location: location.values.location,
        smashes,
      });
      setTimeout(() => this.props.navigate('/login'), 30000);
    }
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes, navigate } = this.props;
    const { activeStep } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="absolute" color="default" className={classes.appBar}>
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
            <Typography component="h1" variant="h4" align="center">
              Sign Up
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for signing up.
                  </Typography>
                  <React.Fragment>
                    <CircularProgress className={classes.progress} />
                    <Typography variant="subtitle1">
                      We're currently provisioning your account. This may take some time. We'll let you know once your account is set up.
                    </Typography>
                  </React.Fragment>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {this.getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={this.handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                      disabled={!this.canNext()}
                    >
                      {activeStep === steps.length - 1 ? 'Register' : 'Next'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  submitSignUp: (signup) => dispatch(submit(signup)),
  navigate: (path) => () =>  dispatch(push(path)),
});

const mapStateToProps = state => ({
  details: {
    valid: isValid('signup-details')(state),
    dirty: isDirty('signup-details')(state),
    values: getFormValues('signup-details')(state),
  },
  location: {
    valid: isValid('signup-location')(state),
    dirty: isDirty('signup-location')(state),
    values: getFormValues('signup-location')(state),
  },
  smashes: state.signUp.smashes,
  newUser: state.signUp.newUser,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Checkout);
