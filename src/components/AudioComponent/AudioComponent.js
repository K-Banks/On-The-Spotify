import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AudioComponent extends Component {
  constructor(props) {
    super(props);
    this.audioReady = props.readyState;
    this.src = props.state.gameData.songData.trackAudio;
    this.audioComponent;
  }

 componentDidMount() {
   this.audioComponent = document.getElementById("audio-Component")[0];
 }

 render() {
   if (this.audioComponent) {
     if (this.audioComponent.readyState > 3) {
       this.audioReady;
       console.log('triggered readyState')
     }
   }
   return (
     <div>
       <audio id="audio-Component">
         <source src={this.src}></source>
       </audio>
     </div>
   )
 }
}

AudioComponent.propTypes = {
  state: PropTypes.object,
  soundReady: PropTypes.func
}
