import React from 'react';

class Timer extends React.Component {

  constructor(props) {
    super(props);
    this.state = { time: 0, seconds: 5 };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs){
    return secs;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer() {
    if (this.timer === 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds === 0) {
      clearInterval(this.timer);
    }
  }

  render(){
    return(
      <div>
        <h1>THIS IS THE TIMER</h1>
        <button onClick={this.startTimer}>Start</button>
        <h2>{this.state.time}</h2>
      </div>
    );
  }
}

export default Timer;
