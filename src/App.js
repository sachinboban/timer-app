import React from "react";
import "./App.css";
import Timer from "./Timer";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";

const defaultHrs = 2;
const defaultMins = 0;
const defaultSecs = 0;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      hrs: defaultHrs,
      mins: defaultMins,
      secs: defaultSecs
    };
  }

  startTimerApp = () => {
    this.setState({
      status: 1,
      hrs: this.state.hrs,
      mins: this.state.mins,
      secs: this.state.secs
    });
  };

  stopTimerApp = () => {
    this.setState({
      status: null,
      hrs: defaultHrs,
      mins: defaultMins,
      secs: defaultSecs
    });
  };

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
    if (!this.state.status) {
      return (
        <div className="App">
          <header className="App-header">
            <div className="timer-normal">
              {this.getHrsLeft()}
              <span className="handle">h</span>
              {this.getMinsLeft()}
              <span className="handle">m</span>
              {this.getSecsLeft()}
              <span className="handle">s</span>
            </div>
            <button onClick={this.startTimerApp}>
              <PlayArrowIcon />
            </button>
          </header>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <Timer
              hrs={this.state.hrs}
              mins={this.state.mins}
              secs={this.state.secs}
            />
            <button onClick={this.stopTimerApp}>
              <StopIcon />
            </button>
          </header>
        </div>
      );
    }
  }
}

export default App;
