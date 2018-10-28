import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { reduxForm, Field, Form } from 'redux-form';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/Lock';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import SmashField from '../../Components/SmashField';

import styles from './styles';
import { login } from '../../Modules/auth/actions';

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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(values) {
    this.props.loginUser(values.email, values.smashpass)
    return true;
  }

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
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Form className={classes.form} onSubmit={this.props.handleSubmit(this.submit)}>
              <FormControl margin="normal" fullWidth>
                <Field
                  name="email"
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  autoFocus
                  component={OuterTextField}
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <Field
                  name="smashpass"
                  label="Smashpass"
                  fullWidth
                  component={SmashField}
                  onComplete={console.log}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign in
              </Button>
            </Form>
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
  loginUser: (email, smash) => dispatch(login(email, smash)),
});

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'login'
  }),
)(Home);
