import React, { Component } from 'react'
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux';
import { wait } from '../Modules/signup';

const styles = {
  root: {
    flexGrow: 1,
  },
  progress: {
    height: 3,
  }
};

class SmashField extends Component {
  state = {
    progress: 0,
  };

  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange($event) {
    if (!this.props.wait) {
      const { input: { onChange }, onComplete } = this.props;
      const regex = /^[abcdefghijklmnopqrstuvwxyz]+$/;
      let value = $event.target.value.toLowerCase();
      const length = value.length;
      const progress = length/25*100;

      if (length === 0 || (length <= 25 && regex.test(value))) {
        if (length === 0 ){
          this.setState({ progress: 0 });
        } else {
          this.setState({ progress });
        }

        if (length === 25) {
          onComplete(value);
          if (this.props.clearOnComplete) {
            value = '';
            this.setState({ progress: 0 });
            this.props.triggerWaiting();
          }
        }
        $event.target.value = value;
        onChange($event);
      }
    }
  }

  render() {
    const { label, classes, input: { value }, overallProgress, meta } = this.props;
    const { progress } = this.state;
    return (
      <FormControl fullWidth>
        <TextField
          label={label}
          onChange={this.handleOnChange}
          fullWidth
          value={value}
          type="password"
          error={!!meta.error && meta.touched}
        />
        <div className={classes.root}>
          <LinearProgress variant="determinate" color="primary" value={progress} className={classes.progress} />
          {!!overallProgress && <LinearProgress variant="determinate" color="primary" value={overallProgress} />}
        </div>
        <FormHelperText>
          Smash your keyboard until the bar fills up.
        </FormHelperText>
        {!!meta.error && meta.touched && (
          <FormHelperText error>
            {meta.error}
          </FormHelperText>
        )}
      </FormControl>
    )
  }
}

SmashField.defaultProps = {
  overallProgress: false,
};

const mapStateToProps = state => ({
  wait: state.signUp.wait,
});

// eslint-disable-next-line
const mapDispatchToProps = dispatch => ({ 
  triggerWaiting: () => dispatch(wait()),
});

export default compose(
  withStyles(styles, { withTheme: true}),
  connect(mapStateToProps, mapDispatchToProps),
)(SmashField);