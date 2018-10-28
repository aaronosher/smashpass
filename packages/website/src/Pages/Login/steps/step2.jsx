import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { reduxForm, Field, Form } from 'redux-form';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import PhotoIcon from '@material-ui/icons/Photo';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import SmashField from '../../../Components/SmashField';
import validator from '../../../Modules/auth/validators/login';

import styles from './step2.css';
import { login } from '../../../Modules/auth/actions';

class step2 extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(values) {
    this.props.loginUser(values.email, values.smashpass)
    return true;
  }

  select = (i) => () => {
    console.log(i);
  }

  render() {
    const { classes, auth } = this.props;
    return (
      <React.Fragment className={classes.paper}>
        <Avatar className={classes.avatar} style={{ alignItems: "center", }}>
          <PhotoIcon />
        </Avatar>
        <Typography component="h1" variant="h5" gutterBottom>
          Step 2: Memorable Location
        </Typography>
        <div className={classes.root}>
          <Grid container spacing={8}>
            <Grid container item xs={12} spacing={24}>
            <Grid item xs={4}>
                <Paper className={classes.paper} onClick={this.select(0)}>
                  <img src='https://maps.googleapis.com/maps/api/streetview?key=AIzaSyBKzVDpwD25RqoLmlfohjJZiHsOSNjEVvI&location=51.87794,0.54826&size=500x500' height={80} />
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper} onClick={this.select(1)}>
                  <img src='https://maps.googleapis.com/maps/api/streetview?key=AIzaSyBKzVDpwD25RqoLmlfohjJZiHsOSNjEVvI&location=51.87794,0.54826&size=500x500' height={80} />
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper} onClick={this.select(2)}>
                  <img src='https://maps.googleapis.com/maps/api/streetview?key=AIzaSyBKzVDpwD25RqoLmlfohjJZiHsOSNjEVvI&location=51.87794,0.54826&size=500x500' height={80} />
                </Paper>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={24}>
              <Grid item xs={4}>
                <Paper className={classes.paper} onClick={this.select(3)}>
                  <img src='https://maps.googleapis.com/maps/api/streetview?key=AIzaSyBKzVDpwD25RqoLmlfohjJZiHsOSNjEVvI&location=51.87794,0.54826&size=500x500' height={80} />
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper} onClick={this.select(4)}>
                  <img src='https://maps.googleapis.com/maps/api/streetview?key=AIzaSyBKzVDpwD25RqoLmlfohjJZiHsOSNjEVvI&location=51.87794,0.54826&size=500x500' height={80} />
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper} onClick={this.select(5)}>
                  <img src='https://maps.googleapis.com/maps/api/streetview?key=AIzaSyBKzVDpwD25RqoLmlfohjJZiHsOSNjEVvI&location=51.87794,0.54826&size=500x500' height={80} />
                </Paper>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={24}>
              <Grid item xs={4}>
                <Paper className={classes.paper} onClick={this.select(6)}>
                  <img src='https://maps.googleapis.com/maps/api/streetview?key=AIzaSyBKzVDpwD25RqoLmlfohjJZiHsOSNjEVvI&location=51.87794,0.54826&size=500x500' height={80} />
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper} onClick={this.select(7)}>
                  <img src='https://maps.googleapis.com/maps/api/streetview?key=AIzaSyBKzVDpwD25RqoLmlfohjJZiHsOSNjEVvI&location=51.87794,0.54826&size=500x500' height={80} />
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper} onClick={this.select(8)}>
                  <img src='https://maps.googleapis.com/maps/api/streetview?key=AIzaSyBKzVDpwD25RqoLmlfohjJZiHsOSNjEVvI&location=51.87794,0.54826&size=500x500' height={80} />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </div>
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={auth.loggingIn}
          style={{ marginTop: 20 }}
        >
          Submit
        </Button>
      </React.Fragment>
    );
  }
}

step2.propTypes = {
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
  reduxForm({
    form: 'login',
    validate: validator,
  }),
)(step2);