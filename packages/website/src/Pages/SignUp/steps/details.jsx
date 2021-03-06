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
import validator from '../../../Modules/signup/validators/details';

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

class details extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    const { valid, validEmitter } = this.props;
    validEmitter(0, valid);
  }

  render() {
    return (
      <Fragment>
        <Typography variant="h6" gutterBottom>
          User Details
        </Typography>
        <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <Field
            required
            id="firstName"
            name="firstName"
            label="First Name"
            fullWidth
            autoComplete="fname"
            component={OuterTextField}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
            component={OuterTextField}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            required
            id="email"
            name="email"
            label="Email Address"
            fullWidth
            autoComplete="email"
            component={OuterTextField}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
              required
              id="emailConfirm"
              name="emailConfirm"
              label="Confirm Email Address"
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

details.propTypes = {
  valid: PropTypes.bool.isRequired,
}

export default compose(
  reduxForm({
    form: 'signup-details',
    destroyOnUnmount: false,
    onChange: details.onChange,
    validate: validator,
  }),
)(details);
