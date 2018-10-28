import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import SmashField from '../../../Components/SmashField';
import startSign from '../../../Images/go.png';
import stopSign from '../../../Images/stop.png';

import styles from '../styles';
import { addSmash } from '../../../Modules/signup';

class smashes extends Component {
  constructor(props) {
    super(props);
    this.handleComplete = this.handleComplete.bind(this);
  }

  handleComplete(value) {
    const { addNewSmash } = this.props;
    addNewSmash(value);
  }

  render() {
    const { wait, classes, values } = this.props;
    return (
      <Fragment>
        <Typography variant="h6" gutterBottom>
          Smashes
        </Typography>
        <Typography variant="body1" gutterBottom>
        In order to provision your account we must generate a signature for your characteristic **smashing** of the keyboard. This data will be used as a baseline for determining whether your login request is authentic. Please **smash** your keybord in your preferred way. To do this we ask you to smash 100 times, and make sure to lift your hands between each smash. It should only take a couple of minutes.
        </Typography>
        <Typography variant="body2" gutterBottom>
          {values.length}/100 smashes generated.
          {/* <LinearProgress variant="determinate" color="secondary" value={values.length} /> */}
        </Typography>
        <img src={(wait) ? stopSign : startSign} alt={(wait) ? 'Stop Sign' : 'Go Sign'} className={classes.center} height={100} />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Field
              name="smashes"
              label="Smash Me"
              fullWidth
              onComplete={this.handleComplete}
              clearOnComplete
              component={SmashField}
              overallProgress={values.length}
            />
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

smashes.propTypes = {
  valid: PropTypes.bool.isRequired,
  wait: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  wait: state.signUp.wait,
  values: state.signUp.smashes,
});

const mapDispatchToProps = dispatch => ({
  addNewSmash: (smash) => dispatch(addSmash(smash)),
});

export default compose(
  reduxForm({
    form: 'signup-smasshes',
    destroyOnUnmount: false,
    onChange: smashes.onChange,
  }),
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { withTheme: true }),
)(smashes);
