import React from 'react';
import PropTypes from 'prop-types';

class Token extends React.Component {

  componentDidMount() {
    let location = window.location.href;
    let sliceIndex = location.indexOf('access_token');
    let baseURL = location.slice(0,sliceIndex);
    let startSlice = (location.indexOf("=") + 1);
    let endSlice = location.indexOf("&");
    let accessToken = location.slice(startSlice, endSlice);
    this.props.grabUserToken(accessToken);
    window.location = baseURL;
  }

  render() {
    return (
      <div></div>
    )
  }
}

Token.propTypes = {
  state: PropTypes.object,
  grabUserToken: PropTypes.func,
  gameStart: PropTypes.func
}

export default Token;
