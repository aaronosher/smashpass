import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import validator from '../../../Modules/signup/validators/location';

const OuterTextField = (props) => (
  <FormControl fullWidth>
    <TextField 
      {...props}
      {...props.input}
      error={!!props.meta.error && props.meta.touched}
    />
    {!!props.meta.error && props.meta.touched && (
      <FormHelperText error>
        {props.meta.error}
      </FormHelperText>
    )}
  </FormControl>
);

class location extends Component {
  render() {
    return (
      <Fragment>
        <Typography variant="h6" gutterBottom>
          Location
        </Typography>
        <Typography variant="body1" gutterBottom>
          SmashPass is a two factor authntication powered identity provider. Our second factor works by showing you five images, an undisclosed amount of which are a place that you specify. Please specify a location below. We'll let you know if it isn't valid.
        </Typography>
        <Grid container spacing={24}>
        <Grid item xs={12}>
          <Field
            required
            id="location"
            name="location"
            label="Location"
            fullWidth
            component={OuterTextField}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="I consent to having my data stored and proccessed."
          />
        </Grid>
      </Grid>
      </Fragment>
    )
  }
}

location.propTypes = {
  valid: PropTypes.bool.isRequired,
}

export default compose(
  reduxForm({
    form: 'signup-location',
    destroyOnUnmount: false,
    validate: validator,
  }),
)(location);
