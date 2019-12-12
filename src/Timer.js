import React from "react";
import "./index.css";

function cyclicDecrement(num, roundNum) {
  if (num === 0) {
    return roundNum - 1;
  } else {
    return num - 1;
  }
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "normal",
      hrs: props.hrs,
      mins: props.mins,
      secs: props.secs
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      console.log(this.state);
      let secs = cyclicDecrement(this.state.secs, 60);
      let mins = this.state.mins;
      let hrs = this.state.hrs;
      let status = this.state.status;

      if (this.state.status) {
        if (secs === 59) {
          mins = cyclicDecrement(mins, 60);
          if (mins === 59) {
            if (hrs === 0) {
              mins = 0;
              secs = 0;
              status = null;
            } else {
              hrs = hrs - 1;
            }
          }
        }

        if (status && mins < 15 && hrs === 0) {
          status = "warn";
        }

        if (status && mins < 5 && hrs === 0) {
          status = "out";
        }

        this.setState({
          status: status,
          hrs: hrs,
          mins: mins,
          secs: secs
        });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getHrsLeft = () => {
    if (this.state.hrs < 10) {
      return "0" + this.state.hrs;
    } else {
      return this.state.hrs;
    }
  };

  getMinsLeft = () => {
    if (this.state.mins < 10) {
      return "0" + this.state.mins;
    } else {
      return this.state.mins;
    }
  };

  getSecsLeft = () => {
    if (this.state.secs < 10) {
      return "0" + this.state.secs;
    } else {
      return this.state.secs;
    }
  };

  render() {
    const hrsLeft = this.getHrsLeft();
    const minsLeft = this.getMinsLeft();
    const secsLeft = this.getSecsLeft();
    let cName = "timer-out";
    if (this.state.status) {
      cName = "timer-" + this.state.status;
    }

    return (
      <div className={cName}>
        {hrsLeft}
        <span className="handle">h</span>
        {minsLeft}
        <span className="handle">m</span>
        {secsLeft}
        <span className="handle">s</span>
      </div>
    );
  }
}

export default Timer;
