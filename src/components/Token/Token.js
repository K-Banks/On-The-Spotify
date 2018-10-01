import React from 'react';
import PropTypes from 'prop-types';

class Token extends React.Component {

  componentDidMount() {
    console.log('hello this component did mount');
    let location = window.location.href;
    let sliceIndex = location.indexOf('access_token');
    console.log(sliceIndex);
    let baseURL = location.slice(0,sliceIndex);
    console.log('base url ' + baseURL);
    let startSlice = (location.indexOf("=") + 1);
    let endSlice = location.indexOf("&");
    let accessToken = location.slice(startSlice, endSlice);
    this.props.grabUserToken(accessToken);
    let redirectURL = baseURL + 'game';
    window.location = redirectURL;
  }

  render() {
    return (
      <div>
        <p>This component shouldnt last long enough for you to see this.</p>
      </div>
    )
  }
}

Token.propTypes = {
  state: PropTypes.object,
  grabUserToken: PropTypes.func
}

export default Token;
