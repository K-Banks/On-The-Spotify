import React from 'react';
import { connect } from 'react-redux';
import { fetchSong } from './../actions';
import { Link } from 'react-router-dom';

function TestForm(props) {

  function handleTestClick(event){
    const {dispatch} = props;
    console.log('you clicked me');
    fetchSong();
  }

  return(
    <div>
        <Link to="/game">START A GAME!</Link>
    </div>
  );
}

export default connect()(TestForm);
