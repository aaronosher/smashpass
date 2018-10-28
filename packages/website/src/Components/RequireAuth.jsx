import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const requireAuth = (InnerComponent) => {
  class authenticate extends Component {
    componentWillMount() {
      if (!this.props.user) {
        this.context.router.history.push('/login');
      }
    }

    render() {
      return (
        <React.Fragment>
          <InnerComponent {...this.props} />
        </React.Fragment>
      )
    }
  }

  authenticate.contextTypes = {
    router: PropTypes.object.isRequired,
  };

  const mapStateToProps = state => ({
    user: state.auth.user,
  });
  
  return connect(mapStateToProps)(authenticate);
};

export default requireAuth;
