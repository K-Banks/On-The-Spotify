import React from 'react';
import { connect } from 'react-redux';

function TestForm(props) {

  function handleTestClick(event){
    const { dispatch } = props;
    console.log('you clicked me');
    const action = {
      type: 'REQUEST'
    }
    dispatch(action);
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
