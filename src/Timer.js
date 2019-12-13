import React from "react";
import "./index.css";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";

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

  secs = Math.ceil(tempMS / 1000);

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

    let status = "normal";
    if (timerMS < timeToMS(0, 5, 0)) {
      status = "danger";
    } else if (timerMS < timeToMS(0, 15, 0)) {
      status = "warn";
    }

    this.state = {
      status: status,
      endTime: endTime,
      timerMS: timerMS,
      timeRemain: timerMS
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.status) {
        let currentTime = new Date();
        let timeLeft = this.state.endTime - currentTime;
        let status = this.state.status;

        if (timeLeft <= 0) {
          timeLeft = 0;
          status = null;
        } else if (timeLeft < timeToMS(0, 5, 0)) {
          status = "danger";
        } else if (timeLeft < timeToMS(0, 15, 0)) {
          status = "warn";
        }

        this.setState({
          status: status,
          endTime: this.state.endTime,
          timerMS: this.state.timerMS,
          timeRemain: timeLeft
        });
      }
    }, 1);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderProgressBar = () => {
    let timePassed = this.state.timerMS - this.state.timeRemain;
    let partCovered = (timePassed / this.state.timerMS) * 100;

    const progessStyle = {
      width: partCovered + "%",
      height: "1px",
      backgroundColor: "white",
      display: "inline-block"
    };

    let icon =
      this.state.timeRemain === 0 ? (
        <EmojiPeopleIcon />
      ) : (
        <DirectionsBikeIcon />
      );

    return (
      <div className="progess-container">
        <div className="progress-bar" style={progessStyle}></div>
        <div className="runner">{icon}</div>
      </div>
    );
  };

  render() {
    let timeLeft = MStotime(this.state.timeRemain);
    let cName = "timer-danger";
    if (this.state.status) {
      cName = "timer-" + this.state.status;
    }

    return (
      <div className="timer-container">
        <div className={cName}>
          {timeLeft.hrs}
          <span className="handle">h</span>
          {timeLeft.mins}
          <span className="handle">m</span>
          {timeLeft.secs}
          <span className="handle">s</span>
        </div>
        {this.renderProgressBar()}
      </div>
    );
  }
}

export default Timer;
