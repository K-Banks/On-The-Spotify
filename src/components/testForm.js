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
      <form onSubmit={() => {handleTestClick();}}>
        <button type='submit'>Help!</button>
      </form>
    </div>
  );
}

export default connect()(TestForm);
