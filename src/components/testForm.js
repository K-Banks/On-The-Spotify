import React from 'react';
import { connect } from 'react-redux';
import { fetchSong } from './../actions';

function TestForm(props) {

  function handleTestClick(event){
    const {dispatch} = props;
    console.log('you clicked me');
    fetchSong();
  }

  return(
    <div>
        <h1>Hello is this thing on?</h1>
    </div>
  );
}

export default connect()(TestForm);
