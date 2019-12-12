import React from "react";
import "./index.css";

function padZero(num) {
  return (num < 10 ? "0" : "") + num;
}

function timeToMS(hrs, mins, secs) {
  return secs * 1000 + mins * 60 * 1000 + hrs * 60 * 60 * 1000;
}

function MStotime(msecs) {
  let tempMS = msecs;
  let hrs = 0;
  let mins = 0;
  let secs = 0;

  hrs = Math.floor(tempMS / (60 * 60 * 1000));
  tempMS = tempMS - hrs * 60 * 60 * 1000;

  mins = Math.floor(tempMS / (60 * 1000));
  tempMS = tempMS - mins * 60 * 1000;

  secs = Math.floor(tempMS / 1000);

  return { hrs: padZero(hrs), mins: padZero(mins), secs: padZero(secs) };
}

class Timer extends React.Component {
  constructor(props) {
    super(props);

    let startTime = new Date();
    var startTimeMS = startTime.getTime();
    var timerMS = timeToMS(props.hrs, props.mins, props.secs);
    var endTimeMS = startTimeMS + +timerMS;
    let endTime = new Date();
    endTime.setTime(endTimeMS);

    this.state = {
      status: "normal",
      endTime: endTime,
      timeRemain: timerMS
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.status) {
        console.log(this.state.status);
        let currentTime = new Date();
        let timeLeft = this.state.endTime - currentTime;
        let status = this.state.status;

        if (timeLeft <= 0) {
          timeLeft = 0;
          status = null;
        } else if (timeLeft < timeToMS(0, 5, 0)) {
          status = "out";
        } else if (timeLeft < timeToMS(0, 15, 0)) {
          status = "warn";
        }

        this.setState({
          status: status,
          endTime: this.state.endTime,
          timeRemain: timeLeft
        });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let timeLeft = MStotime(this.state.timeRemain);
    let cName = "timer-out";
    if (this.state.status) {
      cName = "timer-" + this.state.status;
    }
    return (
      <div className={cName}>
        {timeLeft.hrs}
        <span className="handle">h</span>
        {timeLeft.mins}
        <span className="handle">m</span>
        {timeLeft.secs}
        <span className="handle">s</span>
      </div>
    );
  }
}

export default Timer;
